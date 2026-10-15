import React from 'react';

// Renderiza o texto do artigo com uma marcação bem simples, pensada para quem
// vai colar o texto direto do Word:
//   - Linha em branco separa parágrafos
//   - "## Título"  -> subtítulo
//   - "> texto"    -> citação em destaque
//   - **texto**    -> negrito
//   - *texto*      -> itálico

const formatarInline = (texto) => {
  const partes = texto.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return partes.map((parte, i) => {
    if (parte.startsWith('**') && parte.endsWith('**')) {
      return <strong key={i} className="font-bold text-parish-dark">{parte.slice(2, -2)}</strong>;
    }
    if (parte.startsWith('*') && parte.endsWith('*') && parte.length > 2) {
      return <em key={i}>{parte.slice(1, -1)}</em>;
    }
    return parte;
  });
};

const ConteudoArtigo = ({ texto }) => {
  if (!texto) return null;

  const blocos = texto.replace(/\r\n/g, '\n').split(/\n\s*\n/).map(b => b.trim()).filter(Boolean);

  return (
    <div className="font-serif text-lg md:text-xl text-stone-700 leading-relaxed">
      {blocos.map((bloco, i) => {
        if (bloco.startsWith('## ')) {
          return (
            <h2 key={i} className="font-serif font-bold text-2xl md:text-3xl text-parish-dark mt-12 mb-4">
              {bloco.slice(3)}
            </h2>
          );
        }

        if (bloco.startsWith('> ')) {
          const citacao = bloco.split('\n').map(l => l.replace(/^>\s?/, '')).join(' ');
          return (
            <blockquote key={i} className="my-10 border-l-4 border-parish-gold pl-6 italic text-parish-brown text-xl md:text-2xl">
              {formatarInline(citacao)}
            </blockquote>
          );
        }

        return (
          <p
            key={i}
            className={`mb-6 text-left md:text-justify hyphens-auto ${i === 0 ? 'first-letter:text-6xl first-letter:font-bold first-letter:text-parish-terracotta first-letter:float-left first-letter:mr-3 first-letter:leading-[0.85]' : ''}`}
          >
            {bloco.split('\n').map((linha, j, arr) => (
              <React.Fragment key={j}>
                {formatarInline(linha)}
                {j < arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
};

export default ConteudoArtigo;
