import React from 'react';

// Números de versículo colados no texto ("15os fariseus") viram sobrescritos discretos
export const TextoComVersiculos = ({ texto }) => {
  const partes = (texto || '').split(/(?<=^|[\s“"‘(])(\d{1,3})(?=[A-Za-zÀ-ÿ“"‘])/);
  return partes.map((parte, i) => (
    i % 2 === 1
      ? <sup key={i} className="text-[0.6em] font-sans font-bold opacity-50 mr-0.5 select-none">{parte}</sup>
      : <React.Fragment key={i}>{parte}</React.Fragment>
  ));
};

// Aclamação ao Evangelho: refrão, versículo e refrão de novo, como na missa
export const Aclamacao = ({ aclamacao, escuro = false }) => {
  if (!aclamacao) return null;
  const refrao = `— ${aclamacao.refrao}`;
  return (
    <div className={`text-center rounded-2xl p-5 md:p-6 ${escuro ? 'bg-white/5 border border-white/10' : 'bg-[#fdfaf2] border border-parish-gold/20'}`}>
      <span className={`block font-sans text-[10px] font-bold uppercase tracking-widest mb-3 ${escuro ? 'text-stone-400' : 'text-parish-gold'}`}>
        Aclamação ao Evangelho
      </span>
      <p className={`font-bold italic ${escuro ? 'text-parish-gold' : 'text-parish-terracotta'}`}>{refrao}</p>
      {aclamacao.versiculo && (
        <p className={`italic my-3 text-[0.9em] ${escuro ? 'text-stone-300' : 'text-stone-600'}`}>{aclamacao.versiculo}</p>
      )}
      <p className={`font-bold italic ${escuro ? 'text-parish-gold' : 'text-parish-terracotta'}`}>{refrao}</p>
    </div>
  );
};
