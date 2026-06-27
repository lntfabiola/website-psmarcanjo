import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, ExternalLink, Loader, RefreshCw, ChevronRight } from 'lucide-react';

const LiturgiaSection = () => {
  const [liturgia, setLiturgia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState('primeiraLeitura');

  // DATA DE HOJE
  const dataObj = new Date();
  const dataHoje = dataObj.toLocaleDateString('pt-BR', { 
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
  });

  const fetchLiturgia = async () => {
    setLoading(true);
    setError(false);
    
    // API Principal (Railway)
    const urlApi = 'https://liturgia.up.railway.app/';

    try {
      const response = await fetch(urlApi);
      if (!response.ok) throw new Error("Falha na conexão");
      
      const data = await response.json();
      if (!data || !data.evangelho) throw new Error("Dados incompletos");

      // =========================================================================
      // SOLUÇÃO: Busca secundária fazendo Web Scraping na Canção Nova via Proxy
      // =========================================================================
      try {
        // Usamos o allorigins para burlar o erro de CORS do navegador
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent('https://liturgia.cancaonova.com/pb/')}`;
        const resSec = await fetch(proxyUrl);
        
        if (resSec.ok) {
          const proxyData = await resSec.json();
          const html = proxyData.contents;

          // Transforma o HTML recebido em um documento pesquisável
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');

          // Procura todos os títulos e divs no site
          const elementos = doc.querySelectorAll('*');
          let encontrouAclamacao = false;
          let refrao = "";
          let texto = "";

          // Vasculha o HTML para achar a Aclamação
          for (let i = 0; i < elementos.length; i++) {
            const el = elementos[i];
            
            // Quando achar o título da Aclamação
            if (el.tagName.match(/^H[2-4]$/) && el.textContent.includes('Aclamação ao Evangelho')) {
              encontrouAclamacao = true;
              let proximo = el.nextElementSibling;
              
              // Pega os parágrafos seguintes até achar outro título
              while (proximo && !proximo.tagName.match(/^H[2-4]$/)) {
                const paragrafo = proximo.textContent.trim();
                if (paragrafo) {
                   // Limpa caracteres especiais do início
                   const textoLimpo = paragrafo.replace(/^[-\u2013\u2014R℟V]\.?\s*/i, "");
                   
                   // Se tiver a palavra Aleluia, salva como refrão. Se não, é o texto.
                   if (paragrafo.toLowerCase().includes('aleluia')) {
                      if (!refrao) refrao = textoLimpo;
                   } else {
                      texto += textoLimpo + " ";
                   }
                }
                proximo = proximo.nextElementSibling;
              }
              break; // Para o loop pois já achou
            }
          }

          // Se achou, injeta os dados na variável principal 'data'
          if (encontrouAclamacao && (refrao || texto)) {
            data.aclamacao = {
              refrao: refrao || "Aleluia, Aleluia, Aleluia.", // Fallback caso ache só o texto
              texto: texto.trim()
            };
          }
        }
      } catch (secErr) {
        console.warn("Erro ao buscar aclamação via scraping:", secErr);
      }
      // =========================================================================

      setLiturgia(data);
    } catch (err) {
      console.warn("API Liturgia falhou:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiturgia();
  }, []);

  // --- RENDERIZAÇÃO: CARREGANDO ---
  if (loading) {
    return (
      <div className="py-20 bg-white flex flex-col items-center justify-center border-t border-gray-100 min-h-[400px]">
        <Loader className="animate-spin text-parish-gold mb-4" size={32} />
        <p className="text-gray-400 font-serif text-xs uppercase tracking-widest animate-pulse">Carregando Liturgia...</p>
      </div>
    );
  }

  // --- RENDERIZAÇÃO: MODO ERRO ---
  if (error || !liturgia) {
    return (
      <section className="py-16 bg-white border-t border-gray-100">
         <div className="max-w-3xl mx-auto px-4 text-center">
            <div className="bg-[#faf7f5] rounded-3xl p-10 border border-[#ebe5de] shadow-sm">
               <BookOpen size={40} className="text-parish-terracotta mb-4 mx-auto"/>
               <h3 className="font-serif font-bold text-xl text-parish-dark mb-2">Liturgia Diária</h3>
               <p className="text-gray-500 mb-8 text-sm">Não foi possível carregar o texto automaticamente.</p>
               <div className="flex flex-col sm:flex-row justify-center gap-3">
                 <button onClick={fetchLiturgia} className="px-5 py-3 border border-gray-300 rounded-xl text-sm font-bold text-gray-600 hover:bg-white flex items-center justify-center gap-2">
                    <RefreshCw size={16}/> Tentar Novamente
                 </button>
                 <a href="https://liturgia.cancaonova.com/pb/" target="_blank" rel="noopener noreferrer" className="px-5 py-3 bg-parish-terracotta text-white rounded-xl text-sm font-bold hover:bg-red-900 flex items-center justify-center gap-2">
                    Ler no Site Oficial <ExternalLink size={16}/>
                 </a>
               </div>
            </div>
         </div>
      </section>
    );
  }

  // --- RENDERIZAÇÃO: SUCESSO ---
  return (
    <section className="py-12 md:py-16 bg-[#fdfdfc] border-t border-gray-100">
      
      {/* Scrollbar estilizada */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d4c4a8; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #b09b75; }
      `}</style>

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          
          {/* LADO ESQUERDO: Controles e Informações */}
          <div className="w-full md:w-1/3 md:sticky md:top-24 flex flex-col items-center md:items-start text-center md:text-left">
            
            {/* Data Badge */}
            <div className="inline-flex items-center gap-2 text-parish-gold bg-white border border-gray-200/60 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-5 shadow-sm">
               <Calendar size={14} /> <span className="capitalize">{dataHoje}</span>
            </div>
            
            <h2 className="text-3xl font-serif font-bold text-parish-dark leading-tight mb-2">
              Liturgia da Palavra
            </h2>
            <p className="text-sm text-gray-500 mb-8">
              Cor Litúrgica: <span className="font-semibold text-parish-brown capitalize">{liturgia.cor}</span>
            </p>

            {/* Menu de Abas */}
            <div className="flex flex-wrap justify-center md:flex-col md:justify-start gap-3 w-full max-w-md">
              {['primeiraLeitura', 'salmo', 'segundaLeitura', 'evangelho'].map((aba) => (
                // LÓGICA: Só mostra o botão se tiver texto
                liturgia[aba] && liturgia[aba].texto && (
                  <button
                    key={aba}
                    onClick={() => setAbaAtiva(aba)}
                    className={`px-5 py-3 md:py-4 rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider transition-all md:text-left flex items-center justify-between group w-auto md:w-full
                      ${abaAtiva === aba 
                        ? 'bg-parish-terracotta text-white shadow-lg shadow-red-900/10 transform scale-105 md:scale-100' 
                        : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'}`}
                  >
                    <span>
                      {aba === 'primeiraLeitura' ? '1ª Leitura' : aba === 'segundaLeitura' ? '2ª Leitura' : aba.charAt(0).toUpperCase() + aba.slice(1)}
                    </span>
                    {abaAtiva === aba && <ChevronRight size={16} className="hidden md:block opacity-80"/>}
                  </button>
                )
              ))}
            </div>

            <div className="mt-8 w-full max-w-md flex justify-center md:justify-start">
               <Link to="/liturgia" className="px-5 py-3 w-full bg-parish-dark text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                  <Calendar size={18} /> Navegar por Dias
               </Link>
            </div>
          </div>

          {/* LADO DIREITO: Card do Texto */}
          <div className="w-full md:w-2/3">
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden flex flex-col h-[550px] md:h-[600px]">
              
              {/* Header do Card */}
              <div className="px-6 py-5 md:px-8 md:py-6 border-b border-gray-100 bg-[#faf9f6] flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">
                 <h3 className="font-serif font-bold text-lg md:text-xl text-gray-800 line-clamp-2">
                    {liturgia[abaAtiva]?.titulo || "Leitura do Dia"}
                 </h3>
                 {liturgia[abaAtiva]?.referencia && (
                   <span className="shrink-0 text-[10px] font-bold text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-full uppercase tracking-wider">
                     {liturgia[abaAtiva].referencia}
                   </span>
                 )}
              </div>

              {/* Corpo do Texto */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 bg-white">
                 <div className="relative">
                    
                    {/* --- REFRÃO DO SALMO (RESPOSTA) --- */}
                    {abaAtiva === 'salmo' && liturgia[abaAtiva]?.refrao && (
                       <div className="mb-8 p-6 bg-[#faf9f6] rounded-xl border border-[#f0ebe5] text-center">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Refrão (Resposta)</p>
                          <p className="text-parish-terracotta font-serif font-bold italic text-lg md:text-xl leading-relaxed">
                             {liturgia[abaAtiva].refrao}
                          </p>
                       </div>
                    )}

                    {/* --- ACLAMAÇÃO AO EVANGELHO --- */}
                    {abaAtiva === 'evangelho' && liturgia.aclamacao && (
                       <div className="mb-8 p-6 bg-[#fdfaf2] rounded-xl border border-parish-gold/20 text-center">
                          <p className="text-[10px] font-bold text-parish-gold uppercase tracking-widest mb-3">Aclamação ao Evangelho</p>
                          {liturgia.aclamacao.refrao && (
                            <p className="text-parish-terracotta font-serif font-bold italic text-lg md:text-xl leading-relaxed mb-2">
                               — {liturgia.aclamacao.refrao}
                            </p>
                          )}
                          {liturgia.aclamacao.texto && (
                            <p className="text-gray-600 font-serif italic text-sm md:text-base leading-relaxed my-3 px-4">
                               {liturgia.aclamacao.texto}
                            </p>
                          )}
                          {liturgia.aclamacao.refrao && (
                            <p className="text-parish-terracotta font-serif font-bold italic text-lg md:text-xl leading-relaxed">
                               — {liturgia.aclamacao.refrao}
                            </p>
                          )}
                       </div>
                    )}

                    {/* Texto Geral */}
                    <div className="text-gray-700 leading-loose text-base md:text-lg font-serif text-justify whitespace-pre-wrap">
                       {liturgia[abaAtiva]?.texto}
                    </div>

                    {/* --- FRASE FINAL (Palavra da Salvação / Palavra do Senhor) --- */}
                    {abaAtiva !== 'salmo' && liturgia[abaAtiva]?.texto && (
                        <div className="mt-12 mb-4 pt-8 border-t border-gray-100 text-center bg-[#faf9f6] -mx-6 md:-mx-10 p-8 rounded-b-lg">
                            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-2">
                                {abaAtiva === 'evangelho' ? 'Palavra da Salvação' : 'Palavra do Senhor'}
                            </p>
                            <p className="text-parish-terracotta text-xl font-serif italic font-medium">
                                {abaAtiva === 'evangelho' ? 'Glória a Vós, Senhor!' : 'Graças a Deus!'}
                            </p>
                        </div>
                    )}
                 </div>
              </div>

            </div>
            
            {/* Rodapé externo */}
            <div className="mt-4 text-center md:text-right">
               <a href="https://liturgia.cancaonova.com/pb/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[10px] text-gray-400 hover:text-parish-terracotta transition-colors uppercase font-bold tracking-widest group">
                  Fonte: Canção Nova <ExternalLink size={10} className="group-hover:translate-x-0.5 transition-transform" />
               </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LiturgiaSection;