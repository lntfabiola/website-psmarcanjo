import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, RefreshCw, ChevronRight, ArrowRight } from 'lucide-react';
import { buscarLiturgia, buscarAclamacao, dataPorExtenso, getCor, estrofesSalmo } from '../utils/liturgia';
import { TextoComVersiculos, Aclamacao } from './LiturgiaPartes';

const ABAS = [
  { id: 'primeiraLeitura', nome: '1ª Leitura', rotulo: 'Primeira Leitura' },
  { id: 'salmo', nome: 'Salmo', rotulo: 'Salmo Responsorial' },
  { id: 'segundaLeitura', nome: '2ª Leitura', rotulo: 'Segunda Leitura' },
  { id: 'evangelho', nome: 'Evangelho', rotulo: 'Evangelho' },
];

const LiturgiaSection = () => {
  const [liturgia, setLiturgia] = useState(null);
  const [erro, setErro] = useState(false);
  const [tentativa, setTentativa] = useState(0);
  const [abaAtiva, setAbaAtiva] = useState('evangelho');

  const hoje = new Date();

  useEffect(() => {
    let cancelado = false;
    const dia = new Date();
    Promise.all([buscarLiturgia(dia), buscarAclamacao(dia)])
      .then(([json, aclamacao]) => { if (!cancelado) setLiturgia({ ...json, aclamacao }); })
      .catch(err => { if (!cancelado) { console.warn('Liturgia indisponível:', err); setErro(true); } });
    return () => { cancelado = true; };
  }, [tentativa]);

  const tentarDeNovo = () => { setErro(false); setTentativa(t => t + 1); };

  // --- CARREGANDO ---
  if (!liturgia && !erro) {
    return (
      <section className="py-12 md:py-16 bg-[#fdfdfc] border-t border-gray-100" aria-label="Carregando liturgia">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-8 md:gap-12 animate-pulse">
          <div className="w-full md:w-1/3 space-y-4">
            <div className="h-7 w-48 bg-stone-200 rounded-full" />
            <div className="h-9 w-3/4 bg-stone-200 rounded-lg" />
            <div className="h-4 w-1/2 bg-stone-100 rounded" />
          </div>
          <div className="w-full md:w-2/3 h-[420px] bg-white rounded-3xl border border-gray-100" />
        </div>
      </section>
    );
  }

  // --- ERRO ---
  if (erro) {
    return (
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-[#faf7f5] rounded-3xl p-10 border border-[#ebe5de] shadow-sm">
            <BookOpen size={40} className="text-parish-terracotta mb-4 mx-auto" />
            <h3 className="font-serif font-bold text-xl text-parish-dark mb-2">Liturgia Diária</h3>
            <p className="text-gray-500 mb-8 text-sm">Não foi possível carregar as leituras agora.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button onClick={tentarDeNovo} className="px-5 py-3 border border-gray-300 rounded-xl text-sm font-bold text-gray-600 hover:bg-white flex items-center justify-center gap-2">
                <RefreshCw size={16} /> Tentar Novamente
              </button>
              <Link to="/liturgia" className="px-5 py-3 bg-parish-terracotta text-white rounded-xl text-sm font-bold hover:bg-red-900 flex items-center justify-center gap-2">
                Abrir a página da Liturgia <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // --- SUCESSO ---
  const cor = getCor(liturgia.cor);
  const l = liturgia.leituras;
  const abas = ABAS.filter(a => l[a.id]?.length);
  const atual = abas.find(a => a.id === abaAtiva) ? abaAtiva : abas[0].id;
  const leitura = l[atual][0]; // a home mostra a primeira opção; a página completa mostra todas
  const ehEvangelho = atual === 'evangelho';
  const ehSalmo = atual === 'salmo';

  return (
    <section className="py-12 md:py-16 bg-[#fdfdfc] border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">

          {/* LADO ESQUERDO: dia, celebração e abas */}
          <div className="w-full md:w-1/3 md:sticky md:top-24 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-parish-gold bg-white border border-gray-200/60 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-5 shadow-sm">
              <Calendar size={14} /> {dataPorExtenso(hoje)}
            </div>

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-parish-terracotta mb-2">Liturgia do dia</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-parish-dark leading-tight mb-3">
              {liturgia.liturgia}
            </h2>
            {liturgia.cor && (
              <p className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                <span className={`w-3 h-3 rounded-full ${cor.ponto}`} /> Cor litúrgica: <span className="font-semibold text-parish-brown">{liturgia.cor}</span>
              </p>
            )}

            <div className="flex flex-wrap justify-center md:flex-col md:justify-start gap-2 md:gap-3 w-full max-w-md">
              {abas.map(aba => (
                <button
                  key={aba.id}
                  onClick={() => setAbaAtiva(aba.id)}
                  className={`px-4 md:px-5 py-2.5 md:py-4 rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider transition-all md:text-left flex items-center justify-between w-auto md:w-full
                    ${atual === aba.id
                      ? `${cor.aba} text-white shadow-lg`
                      : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'}`}
                >
                  <span>{aba.nome}</span>
                  {atual === aba.id && <ChevronRight size={16} className="hidden md:block opacity-80" />}
                </button>
              ))}
            </div>

            <div className="mt-8 w-full max-w-md">
              <Link to="/liturgia" className="px-5 py-3 w-full bg-parish-dark text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                <BookOpen size={18} /> Liturgia completa e outros dias
              </Link>
            </div>
          </div>

          {/* LADO DIREITO: texto da leitura */}
          <div className="w-full md:w-2/3">
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden flex flex-col h-[550px] md:h-[600px]">

              <div className="px-6 py-5 md:px-8 md:py-6 border-b border-gray-100 bg-[#faf9f6]">
                <span className={`block text-[11px] font-bold uppercase tracking-[0.2em] mb-1 ${cor.destaque}`}>
                  {ABAS.find(a => a.id === atual).rotulo}
                </span>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-serif font-bold text-lg md:text-xl text-gray-800 leading-snug">
                    {leitura.titulo || (ehSalmo ? 'Salmo' : '')}
                  </h3>
                  {leitura.referencia && (
                    <span className="text-xs font-bold text-gray-400 whitespace-nowrap">{leitura.referencia}</span>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-white [scrollbar-width:thin] [scrollbar-color:#d4c4a8_transparent]">
                <div className="text-gray-700 leading-loose text-base md:text-lg font-serif">

                  {ehEvangelho && liturgia.aclamacao && (
                    <div className="mb-8"><Aclamacao aclamacao={liturgia.aclamacao} /></div>
                  )}

                  {ehSalmo ? (
                    <>
                      {leitura.refrao && (
                        <div className={`rounded-xl border p-5 mb-6 text-center ${cor.claro}`}>
                          <span className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Refrão</span>
                          <p className="font-bold italic text-parish-dark">{leitura.refrao}</p>
                        </div>
                      )}
                      <div className="space-y-4">
                        {estrofesSalmo(leitura.texto).map((estrofe, i) => (
                          <p key={i} className="pl-4 border-l-2 border-stone-200">{estrofe}</p>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className="text-left md:text-justify hyphens-auto"><TextoComVersiculos texto={leitura.texto} /></p>
                  )}

                  {!ehSalmo && (
                    <div className="mt-10 pt-6 border-t border-gray-100 text-center font-sans text-sm space-y-1">
                      <p className="text-gray-400">— {ehEvangelho ? 'Palavra da Salvação.' : 'Palavra do Senhor.'}</p>
                      <p className="font-bold text-parish-dark">— {ehEvangelho ? 'Glória a vós, Senhor.' : 'Graças a Deus.'}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LiturgiaSection;
