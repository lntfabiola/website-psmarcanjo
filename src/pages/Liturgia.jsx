import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Calendar as CalendarIcon, Loader2, AlertCircle } from 'lucide-react';

const Liturgia = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [liturgia, setLiturgia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dateInputRef = useRef(null);

  const fetchLiturgia = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://liturgia-api-2me3.onrender.com/liturgia/hoje');
      if (!res.ok) throw new Error("Erro ao buscar liturgia");
      const dataApi = await res.json();
      const leituras = dataApi?.leituras || {};
      const primeiraLeitura = leituras.primeira_leitura;
      const salmo = leituras.salmo;
      const segundaLeitura = leituras.segunda_leitura;
      const evangelho = leituras.evangelho;

      if (!evangelho) throw new Error("Evangelho não encontrado");

      // Monta objeto compatível com o restante da página
      const data = {
        data: dataApi.data,
        liturgia: dataApi.titulo_liturgico,
        cor: dataApi.cor_liturgica,
        primeiraLeitura: primeiraLeitura
          ? { referencia: primeiraLeitura.referencia, titulo: primeiraLeitura.titulo, texto: primeiraLeitura.texto }
          : null,
        salmo: salmo
          ? { referencia: salmo.referencia, refrao: salmo.refrao, texto: salmo.texto }
          : null,
        segundaLeitura: segundaLeitura
          ? { referencia: segundaLeitura.referencia, titulo: segundaLeitura.titulo, texto: segundaLeitura.texto }
          : null,
        evangelho: evangelho
          ? { referencia: evangelho.referencia, titulo: evangelho.titulo, texto: evangelho.texto }
          : null,
        aclamacao: null,
      };

      setLiturgia(data);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar a liturgia deste dia. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiturgia(currentDate);
  }, [currentDate]);

  const setToday = () => setCurrentDate(new Date());

  const handleDateClick = () => {
    if (dateInputRef.current && 'showPicker' in HTMLInputElement.prototype) {
      try {
        dateInputRef.current.showPicker();
      } catch (e) {
        dateInputRef.current.focus();
      }
    } else if (dateInputRef.current) {
      dateInputRef.current.focus();
    }
  };

  const dateStr = currentDate.toLocaleDateString('pt-BR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });
  const isoDate = currentDate.toISOString().split('T')[0];

  const getLiturgicalColorClasses = (cor) => {
    const c = (cor || '').toLowerCase();
    if (c.includes('verde')) return { bg: 'bg-gradient-to-br from-emerald-600 to-green-800', text: 'text-white', badge: 'bg-white/20 text-white' };
    if (c.includes('branco')) return { bg: 'bg-gradient-to-br from-stone-100 to-stone-300', text: 'text-stone-800', badge: 'bg-stone-800/10 text-stone-600' };
    if (c.includes('roxo')) return { bg: 'bg-gradient-to-br from-purple-700 to-purple-900', text: 'text-white', badge: 'bg-white/20 text-white' };
    if (c.includes('vermelho')) return { bg: 'bg-gradient-to-br from-red-600 to-red-800', text: 'text-white', badge: 'bg-white/20 text-white' };
    if (c.includes('rosa')) return { bg: 'bg-gradient-to-br from-pink-400 to-pink-600', text: 'text-white', badge: 'bg-white/20 text-white' };
    if (c.includes('preto')) return { bg: 'bg-gradient-to-br from-stone-800 to-black', text: 'text-white', badge: 'bg-white/20 text-white' };
    return { bg: 'bg-gradient-to-br from-parish-terracotta to-[#a0422a]', text: 'text-white', badge: 'bg-white/20 text-white' };
  };

  const colorStyles = liturgia ? getLiturgicalColorClasses(liturgia.cor) : null;

  const formatReadingText = (text, isPsalm = false) => {
    if (!text) return [];

    const normalized = text.replace(/\s+/g, ' ').trim();
    const formatted = isPsalm
      ? normalized.replace(/\s+-\s+/g, '\n').replace(/^\s*-\s*/, '')
      : normalized.replace(/\s+(?=(Proclamação|Naquele tempo,|Palavra do Senhor|Palavra da Salvação))/g, '\n\n');

    return formatted.split(/\n\s*\n|\n/).map(paragraph => paragraph.trim()).filter(Boolean);
  };

  const renderSection = (title, data) => {
    if (!data || (typeof data === 'string' && data.includes("Não há"))) return null;

    return (
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-stone-100 mb-6">
        <h3 className="text-xl md:text-2xl font-serif font-bold text-parish-terracotta mb-2">
          {title}
        </h3>
        {data.referencia && (
          <p className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-6">
            {data.referencia}
          </p>
        )}

        {data.refrao && (
          <p className="font-bold text-stone-800 text-lg mb-4 italic">
            {data.refrao}
          </p>
        )}

        <div className="text-stone-700 leading-relaxed md:text-lg text-justify font-serif space-y-4">
          {formatReadingText(data.texto, title === 'Salmo').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] pt-24 md:pt-32 pb-32 md:pb-28">
      <div className="max-w-4xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-parish-gold font-bold tracking-[0.2em] text-xs uppercase block mb-3 flex items-center justify-center gap-2">
            <BookOpen size={16} /> Espiritualidade
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-stone-800 mb-4">
            Liturgia Diária
          </h1>
          <p className="text-stone-500 max-w-xl mx-auto font-serif italic text-lg">
            "Lâmpada para os meus pés é tua palavra, e luz para o meu caminho." (Sl 119,105)
          </p>
        </div>

        {/* Date Navigator */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-2xl shadow-sm border border-stone-100 p-4 mb-8 gap-4">
          <button
            disabled
            className="flex items-center gap-2 text-stone-300 px-4 py-2 font-bold text-sm uppercase tracking-wider w-full sm:w-auto justify-center cursor-not-allowed"
          >
            <ChevronLeft size={18} /> Anterior
          </button>

          <div className="flex flex-col items-center text-center">
            <div
              className="relative flex items-center justify-center gap-2 text-parish-dark font-bold mb-1 hover:text-parish-terracotta transition-colors cursor-pointer"
              onClick={handleDateClick}
            >
              <CalendarIcon size={18} className="text-parish-gold" />
              <span className="capitalize">{dateStr}</span>
              <input
                ref={dateInputRef}
                type="date"
                value={isoDate}
                disabled
                className="absolute w-0 h-0 opacity-0 overflow-hidden"
                title="Escolher uma data"
              />
            </div>
            <button
              onClick={setToday}
              className="text-[10px] text-stone-400 uppercase tracking-widest font-bold hover:text-parish-terracotta transition-colors mt-1"
            >
              Voltar para Hoje
            </button>
          </div>

          <button
            disabled
            className="flex items-center gap-2 text-stone-300 px-4 py-2 font-bold text-sm uppercase tracking-wider w-full sm:w-auto justify-center cursor-not-allowed"
          >
            Próximo <ChevronRight size={18} />
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-stone-400">
            <Loader2 size={40} className="animate-spin text-parish-gold mb-4" />
            <p className="font-serif italic text-lg">Buscando leituras do dia...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="bg-red-50 text-red-600 p-6 rounded-2xl text-center border border-red-100 flex flex-col items-center">
            <AlertCircle size={32} className="mb-3 opacity-80" />
            <p className="font-bold">{error}</p>
          </div>
        )}

        {/* Liturgia Content */}
        {!loading && !error && liturgia && colorStyles && (
          <div className="animate-fade-in">
            <div className={`${colorStyles.bg} ${colorStyles.text} p-6 md:p-8 rounded-2xl shadow-md mb-6 text-center transition-all duration-500`}>
              {liturgia.cor && (
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-3 ${colorStyles.badge}`}>
                  {liturgia.cor}
                </span>
              )}
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">
                {liturgia.liturgia}
              </h2>
            </div>

            {renderSection(liturgia.primeiraLeitura?.titulo || "Primeira Leitura", liturgia.primeiraLeitura)}
            {renderSection("Salmo Responsorial", liturgia.salmo)}
            {renderSection(liturgia.segundaLeitura?.titulo || "Segunda Leitura", liturgia.segundaLeitura)}

            {liturgia.evangelho && (
              <div className="bg-stone-800 text-white rounded-2xl p-6 md:p-8 shadow-lg border-b-4 border-parish-gold mt-8">
                <div className="flex justify-center mb-6">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <BookOpen size={24} className="text-parish-gold" />
                  </div>
                </div>

                {/* Aclamação ao Evangelho dentro do box escuro sem fundo extra */}
                {liturgia.aclamacao && (
                  <div className="mb-10 text-center">
                    <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">Aclamação ao Evangelho</p>
                    {liturgia.aclamacao.refrao && (
                      <p className="text-parish-gold font-serif font-bold italic text-xl md:text-2xl leading-relaxed mb-4">
                        — {liturgia.aclamacao.refrao}
                      </p>
                    )}
                    {liturgia.aclamacao.texto && (
                      <p className="text-stone-300 font-serif italic text-base md:text-lg leading-relaxed mb-4 px-4">
                        {liturgia.aclamacao.texto}
                      </p>
                    )}
                    {liturgia.aclamacao.refrao && (
                      <p className="text-parish-gold font-serif font-bold italic text-xl md:text-2xl leading-relaxed">
                        — {liturgia.aclamacao.refrao}
                      </p>
                    )}
                  </div>
                )}

                <h3 className="text-xl md:text-2xl font-serif font-bold text-center text-parish-gold mb-2 pt-6 border-t border-stone-700/50">
                  {liturgia.evangelho.titulo || "Evangelho"}
                </h3>
                {liturgia.evangelho.referencia && (
                  <p className="text-sm font-bold text-stone-400 text-center uppercase tracking-widest mb-8">
                    {liturgia.evangelho.referencia}
                  </p>
                )}
                <div className="text-stone-300 leading-relaxed md:text-lg text-justify font-serif space-y-4">
                  {liturgia.evangelho.texto && liturgia.evangelho.texto.split('\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
};
export default Liturgia;