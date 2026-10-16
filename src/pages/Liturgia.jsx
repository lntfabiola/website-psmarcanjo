import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, CalendarDays, AlertCircle, RefreshCw, ChevronDown, Minus, Plus } from 'lucide-react';
import { buscarLiturgia, buscarAclamacao, paraInput, dataPorExtenso, getCor, estrofesSalmo } from '../utils/liturgia';
import { TextoComVersiculos, Aclamacao } from '../components/LiturgiaPartes';

const TAMANHOS = ['text-base', 'text-lg', 'text-xl', 'text-2xl'];

const lerTamanho = () => {
  try {
    const v = Number(localStorage.getItem('liturgia-tamanho'));
    return Number.isInteger(v) && v >= 0 && v < TAMANHOS.length ? v : 1;
  } catch { return 1; }
};

const mesmoDia = (a, b) => a.toDateString() === b.toDateString();
const somarDias = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };

const Resposta = ({ leitor, povo }) => (
  <div className="mt-6 pt-5 border-t border-stone-100 font-sans text-[0.8em] space-y-1">
    <p className="text-stone-500">— {leitor}</p>
    <p className="font-bold text-stone-800">— {povo}</p>
  </div>
);

const Secao = ({ id, rotulo, leituras, cor, children }) => (
  <section id={id} className="scroll-mt-40 bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-stone-100">
    <span className={`text-[11px] font-sans font-bold uppercase tracking-[0.2em] ${cor.destaque}`}>{rotulo}</span>
    {leituras.map((l, i) => (
      <div key={i} className={i > 0 ? 'mt-10 pt-8 border-t border-dashed border-stone-200' : ''}>
        {leituras.length > 1 && (
          <span className="inline-block mt-2 text-[10px] font-sans font-bold uppercase tracking-widest bg-stone-100 text-stone-500 px-2 py-0.5 rounded">
            {i === 0 ? 'Opção 1' : `ou Opção ${i + 1}`}
          </span>
        )}
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mt-2 mb-5">
          {l.titulo && <h2 className="font-serif font-bold text-parish-dark text-[1.15em] leading-snug">{l.titulo}</h2>}
          {l.referencia && <span className="font-sans text-sm font-bold text-stone-400 whitespace-nowrap">{l.referencia}</span>}
        </div>
        {children(l)}
      </div>
    ))}
  </section>
);

const Liturgia = () => {
  const [data, setData] = useState(() => new Date());
  const [tentativa, setTentativa] = useState(0);
  // Resultado da última busca, marcado com a data/tentativa a que pertence
  const [resultado, setResultado] = useState({ chave: null, liturgia: null, erro: false });
  const [tamanho, setTamanho] = useState(lerTamanho);
  const [missaAberta, setMissaAberta] = useState(false);
  const dateInputRef = useRef(null);

  const chave = `${paraInput(data)}#${tentativa}`;
  const loading = resultado.chave !== chave;
  const erro = !loading && resultado.erro;
  // Só mostra o conteúdo do dia selecionado (nunca o do dia anterior enquanto carrega)
  const liturgia = !loading && !erro ? resultado.liturgia : null;

  useEffect(() => {
    let cancelado = false; // ignora respostas antigas ao trocar de dia rápido
    Promise.all([buscarLiturgia(data), buscarAclamacao(data)])
      .then(([json, aclamacao]) => {
        if (!cancelado) setResultado({ chave, liturgia: { ...json, aclamacao }, erro: false });
      })
      .catch(err => {
        if (cancelado) return;
        console.error('Erro ao buscar liturgia:', err);
        setResultado(r => ({ ...r, chave, erro: true }));
      });
    return () => { cancelado = true; };
  }, [chave, data]);

  const mudarTamanho = (delta) => {
    setTamanho(t => {
      const novo = Math.min(TAMANHOS.length - 1, Math.max(0, t + delta));
      try { localStorage.setItem('liturgia-tamanho', String(novo)); } catch { /* sem armazenamento */ }
      return novo;
    });
  };

  const abrirCalendario = () => {
    try { dateInputRef.current?.showPicker(); } catch { dateInputRef.current?.focus(); }
  };

  const escolherData = (e) => {
    if (!e.target.value) return;
    const [a, m, d] = e.target.value.split('-').map(Number);
    setData(new Date(a, m - 1, d));
  };

  const hoje = new Date();
  const ehHoje = mesmoDia(data, hoje);
  const dataExtenso = dataPorExtenso(data);
  const cor = getCor(resultado.liturgia?.cor); // mantém a cor anterior durante o carregamento
  const l = liturgia?.leituras || {};

  const atalhos = [
    l.primeiraLeitura?.length && { id: 'primeira', nome: '1ª Leitura' },
    l.salmo?.length && { id: 'salmo', nome: 'Salmo' },
    l.segundaLeitura?.length && { id: 'segunda', nome: '2ª Leitura' },
    l.evangelho?.length && { id: 'evangelho', nome: 'Evangelho' },
  ].filter(Boolean);

  const antifonas = liturgia?.antifonas || {};
  const oracoes = liturgia?.oracoes || {};
  const itensMissa = [
    ['Antífona de entrada', antifonas.entrada],
    ['Oração do dia', oracoes.coleta],
    ['Sobre as oferendas', oracoes.oferendas],
    ['Antífona da comunhão', antifonas.comunhao],
    ['Depois da comunhão', oracoes.comunhao],
  ].filter(([, texto]) => texto);

  return (
    <div className="min-h-screen bg-[#f4f1ea] pb-32 md:pb-28">

      {/* Topo na cor litúrgica do dia */}
      <div className={`bg-gradient-to-br ${cor.faixa} pt-28 md:pt-36 pb-24 md:pb-28 px-4 text-white transition-colors duration-700`}>
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-bold tracking-[0.25em] text-[11px] uppercase text-white/70 flex items-center justify-center gap-2 mb-4">
            <BookOpen size={14} /> Liturgia Diária
          </span>
          {loading ? (
            <div className="h-10 md:h-14 w-3/4 mx-auto rounded-xl bg-white/15 animate-pulse" />
          ) : (
            <h1 className="text-3xl md:text-5xl font-serif font-bold leading-tight drop-shadow-sm">
              {liturgia?.liturgia || 'Liturgia Diária'}
            </h1>
          )}
          {liturgia?.cor && (
            <span className="inline-flex items-center gap-2 mt-5 px-3 py-1 rounded-full bg-black/15 backdrop-blur-sm text-xs font-bold uppercase tracking-widest">
              <span className={`w-2.5 h-2.5 rounded-full ${cor.ponto}`} /> Cor litúrgica: {liturgia.cor}
            </span>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-14 md:-mt-16 relative z-10">

        {/* Navegação de datas */}
        <div className="bg-white rounded-2xl shadow-lg border border-stone-100 p-2 flex items-center gap-2">
          <button
            onClick={() => setData(d => somarDias(d, -1))}
            className="p-3 rounded-xl text-stone-500 hover:bg-stone-100 hover:text-parish-dark transition"
            aria-label="Dia anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button onClick={abrirCalendario} className="relative flex-1 flex flex-col items-center py-1.5 rounded-xl hover:bg-stone-50 transition">
            <span className="flex items-center gap-2 font-bold text-parish-dark text-sm md:text-base">
              <CalendarDays size={16} className="text-parish-gold shrink-0" /> {dataExtenso}
            </span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-stone-400">
              {ehHoje ? 'Hoje' : 'Toque para escolher outra data'}
            </span>
            <input
              ref={dateInputRef}
              type="date"
              value={paraInput(data)}
              onChange={escolherData}
              className="absolute inset-0 opacity-0 pointer-events-none"
              tabIndex={-1}
              aria-hidden="true"
            />
          </button>
          <button
            onClick={() => setData(d => somarDias(d, 1))}
            className="p-3 rounded-xl text-stone-500 hover:bg-stone-100 hover:text-parish-dark transition"
            aria-label="Próximo dia"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        {!ehHoje && (
          <div className="text-center mt-3">
            <button onClick={() => setData(new Date())} className="text-xs font-bold uppercase tracking-widest text-parish-terracotta hover:underline">
              Voltar para hoje
            </button>
          </div>
        )}

        {/* Atalhos + tamanho da letra (fixos ao rolar) */}
        {liturgia && !erro && (
          <div className="sticky top-[68px] z-20 mt-6 -mx-4 px-4 py-2 bg-[#f4f1ea]/90 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <nav className="flex-1 flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {atalhos.map(a => (
                  <a
                    key={a.id}
                    href={`#${a.id}`}
                    className="whitespace-nowrap px-3.5 py-1.5 rounded-full bg-white border border-stone-200 text-xs font-bold text-stone-600 hover:border-parish-gold hover:text-parish-dark transition"
                  >
                    {a.nome}
                  </a>
                ))}
              </nav>
              <div className="flex items-center bg-white border border-stone-200 rounded-full shrink-0">
                <button onClick={() => mudarTamanho(-1)} disabled={tamanho === 0} className="p-2 text-stone-500 disabled:opacity-30" aria-label="Diminuir letra"><Minus size={14} /></button>
                <span className="text-xs font-bold text-stone-500 font-serif select-none">Aa</span>
                <button onClick={() => mudarTamanho(1)} disabled={tamanho === TAMANHOS.length - 1} className="p-2 text-stone-500 disabled:opacity-30" aria-label="Aumentar letra"><Plus size={14} /></button>
              </div>
            </div>
          </div>
        )}

        {/* Carregando */}
        {loading && (
          <div className="mt-6 space-y-6" aria-label="Carregando leituras">
            {[0, 1].map(i => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-stone-100 space-y-3 animate-pulse">
                <div className="h-3 w-24 bg-stone-200 rounded" />
                <div className="h-6 w-2/3 bg-stone-200 rounded" />
                <div className="h-4 w-full bg-stone-100 rounded" />
                <div className="h-4 w-full bg-stone-100 rounded" />
                <div className="h-4 w-4/5 bg-stone-100 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Erro */}
        {!loading && erro && (
          <div className="mt-6 bg-white p-8 rounded-3xl text-center border border-stone-100 flex flex-col items-center">
            <AlertCircle size={32} className="mb-3 text-parish-terracotta opacity-80" />
            <p className="font-bold text-parish-dark mb-1">Não foi possível carregar a liturgia deste dia.</p>
            <p className="text-sm text-stone-500 mb-5">O serviço de leituras pode estar lento. Tente novamente em instantes.</p>
            <button onClick={() => setTentativa(t => t + 1)} className="flex items-center gap-2 bg-parish-dark text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-black transition">
              <RefreshCw size={16} /> Tentar de novo
            </button>
          </div>
        )}

        {/* Leituras */}
        {!loading && !erro && liturgia && (
          <div className={`mt-4 space-y-6 font-serif text-stone-700 leading-relaxed ${TAMANHOS[tamanho]}`}>

            {l.primeiraLeitura?.length > 0 && (
              <Secao id="primeira" rotulo="Primeira Leitura" leituras={l.primeiraLeitura} cor={cor}>
                {(x) => (<>
                  <p className="text-left md:text-justify hyphens-auto"><TextoComVersiculos texto={x.texto} /></p>
                  <Resposta leitor="Palavra do Senhor." povo="Graças a Deus." />
                </>)}
              </Secao>
            )}

            {l.salmo?.length > 0 && (
              <Secao id="salmo" rotulo="Salmo Responsorial" leituras={l.salmo} cor={cor}>
                {(x) => (<>
                  {x.refrao && (
                    <div className={`rounded-2xl border p-4 md:p-5 mb-6 ${cor.claro}`}>
                      <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-stone-500 block mb-1">Refrão</span>
                      <p className="font-bold italic text-parish-dark">{x.refrao}</p>
                    </div>
                  )}
                  <div className="space-y-4">
                    {estrofesSalmo(x.texto).map((estrofe, i) => (
                      <p key={i} className="pl-4 border-l-2 border-stone-200">{estrofe}</p>
                    ))}
                  </div>
                </>)}
              </Secao>
            )}

            {l.segundaLeitura?.length > 0 && (
              <Secao id="segunda" rotulo="Segunda Leitura" leituras={l.segundaLeitura} cor={cor}>
                {(x) => (<>
                  <p className="text-left md:text-justify hyphens-auto"><TextoComVersiculos texto={x.texto} /></p>
                  <Resposta leitor="Palavra do Senhor." povo="Graças a Deus." />
                </>)}
              </Secao>
            )}

            {l.evangelho?.length > 0 && (
              <section id="evangelho" className="scroll-mt-40 bg-parish-dark text-stone-200 rounded-3xl p-6 md:p-10 shadow-xl border-b-4 border-parish-gold">
                <div className="text-center mb-6">
                  <span className="text-parish-gold text-2xl">✠</span>
                  <span className="block text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-parish-gold mt-1">Evangelho</span>
                </div>
                {liturgia.aclamacao && <div className="mb-8"><Aclamacao aclamacao={liturgia.aclamacao} escuro /></div>}
                {l.evangelho.map((x, i) => (
                  <div key={i} className={i > 0 ? 'mt-10 pt-8 border-t border-dashed border-white/15' : ''}>
                    <div className="text-center mb-6">
                      {x.titulo && <h2 className="font-serif font-bold text-white text-[1.15em] leading-snug">{x.titulo}</h2>}
                      {x.referencia && <span className="font-sans text-sm font-bold text-stone-400">{x.referencia}</span>}
                      <p className="font-sans text-[0.8em] font-bold text-stone-300 mt-3">— Glória a vós, Senhor.</p>
                    </div>
                    <p className="text-left md:text-justify hyphens-auto [&_sup]:text-stone-500"><TextoComVersiculos texto={x.texto} /></p>
                    <div className="mt-6 pt-5 border-t border-white/10 font-sans text-[0.8em] space-y-1 text-center">
                      <p className="text-stone-400">— Palavra da Salvação.</p>
                      <p className="font-bold text-white">— Glória a vós, Senhor.</p>
                    </div>
                  </div>
                ))}
              </section>
            )}

            {/* Antífonas e orações (recolhido por padrão) */}
            {itensMissa.length > 0 && (
              <section className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
                <button
                  onClick={() => setMissaAberta(a => !a)}
                  className="w-full flex items-center justify-between p-6 md:px-10 text-left"
                  aria-expanded={missaAberta}
                >
                  <span>
                    <span className={`block text-[11px] font-sans font-bold uppercase tracking-[0.2em] ${cor.destaque}`}>Para a Missa</span>
                    <span className="font-serif font-bold text-parish-dark text-[1.05em]">Antífonas e orações do dia</span>
                  </span>
                  <ChevronDown size={20} className={`text-stone-400 transition-transform ${missaAberta ? 'rotate-180' : ''}`} />
                </button>
                {missaAberta && (
                  <div className="px-6 md:px-10 pb-8 space-y-6">
                    {itensMissa.map(([titulo, texto]) => (
                      <div key={titulo}>
                        <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-stone-400">{titulo}</span>
                        <p className="mt-1">{texto.replace(/;(?=\S)/g, '; ')}</p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            <p className="text-center font-sans text-xs text-stone-400 pt-2">
              Textos litúrgicos conforme o Missal Romano e o Lecionário da CNBB.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Liturgia;
