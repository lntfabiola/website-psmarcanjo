import React, { useState, useRef } from 'react';
import { MessageCircle, Book, Flame, ChevronLeft, ChevronRight } from 'lucide-react';
import historyBg from '../assets/images/hero-bg.jpg';
import imgAilton from '../assets/clero/imgAilton.jpeg';
import imgElinaldo from '../assets/clero/imgElinaldo.jpeg';
import imgMarcel from '../assets/clero/imgMarcel.jpeg';

// ─────────────────────────────────────
//  CLERO ATUAL
// ─────────────────────────────────────
const cleroAtual = [
  {
    nome: "Pe. Ailton R. Damasceno, MSC",
    cargo: "Pároco",
    img: imgAilton,
    msg: "Conduzindo o rebanho com amor e a proteção de São Miguel."
  },
  {
    nome: "Pe. Elinaldo C. Assunção, MSC",
    cargo: "Vigário Paroquial",
    img: imgElinaldo,
    msg: "Auxiliando na missão de evangelizar e servir ao altar do Senhor."
  },
  {
    nome: "Diác. Marcel Alves Martins",
    cargo: "Diácono Permanente",
    img: imgMarcel,
    msg: "Serviço à caridade, à palavra e à liturgia em nossa comunidade."
  }
];

// ─────────────────────────────────────
//  HISTÓRICO — TODOS OS PADRES
//  (Edite os nomes aqui quando souber!)
// ─────────────────────────────────────
const todosOsPadres = [
  { nome: "Pe. [Nome do Padre 1], MSC", cargo: "Pároco Fundador", falecido: false },
  { nome: "Pe. [Nome do Padre 2], MSC", cargo: "Vigário", falecido: false },
  { nome: "Pe. [Nome do Padre 3], MSC", cargo: "Vigário", falecido: false },
  { nome: "Pe. [Nome do Padre 4], MSC", cargo: "Vigário", falecido: false },
  { nome: "Pe. [Nome do Padre 5], MSC", cargo: "Pároco", falecido: false },
  { nome: "Pe. [Nome do Padre 6], MSC", cargo: "Vigário", falecido: false },
  { nome: "Pe. [Nome do Padre 7], MSC", cargo: "Vigário", falecido: false },
  { nome: "Pe. [Nome do Padre 8], MSC", cargo: "Vigário", falecido: true },
  { nome: "Pe. [Nome do Padre 9], MSC", cargo: "Pároco", falecido: false },
  { nome: "Pe. [Nome do Padre 10], MSC", cargo: "Vigário", falecido: false },
  { nome: "Pe. [Nome do Padre 11], MSC", cargo: "Vigário", falecido: false },
  { nome: "Pe. [Nome do Padre 12], MSC", cargo: "Vigário", falecido: false },
];

// ─────────────────────────────────────
//  CARROSSEL HISTÓRICO (todos juntos)
// ─────────────────────────────────────
const CarrosselHistorico = () => {
  const trackRef = useRef(null);

  const scroll = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const amount = track.clientWidth * 0.75;
    track.scrollBy({ left: dir === 'next' ? amount : -amount, behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-[#f4f1ea] border-t border-[#e0dbd0]">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-12">
          <span className="text-parish-terracotta font-bold tracking-widest uppercase text-xs">Nossa Memória</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-parish-brown mt-2">
            Quem faz parte da nossa História
          </h2>
          <p className="text-gray-500 text-sm mt-3 max-w-xl mx-auto">
            Ao longo dos anos, muitos pastores MSC dedicaram suas vidas a esta comunidade. Guardamos com carinho cada nome.
          </p>
        </div>

        {/* Controles */}
        <div className="flex justify-end gap-2 mb-4">
          <button
            onClick={() => scroll('prev')}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-parish-dark hover:text-white hover:border-parish-dark transition-all shadow-sm"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('next')}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-parish-dark hover:text-white hover:border-parish-dark transition-all shadow-sm"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Track deslizante */}
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto pb-4 scroll-smooth scrollbar-hide"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {todosOsPadres.map((padre, i) => (
            <div
              key={i}
              style={{ scrollSnapAlign: 'start', minWidth: '220px' }}
              className="flex-shrink-0 bg-white p-8 rounded-3xl shadow-xl border border-[#e5e0d8] flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300"
            >
              {/* Avatar circular — mesmo estilo do Nosso Clero */}
              <div className={`w-28 h-28 flex-shrink-0 bg-gray-100 rounded-full overflow-hidden mb-5 shadow-md flex items-center justify-center text-4xl
                ${padre.falecido
                  ? 'border-4 border-parish-gold'
                  : 'border-4 border-parish-gold'
                }`}
              >
                {padre.falecido
                  ? <Flame size={36} className="text-parish-gold" />
                  : <span>👤</span>
                }
              </div>

              {/* Nome */}
              <h3 className="text-base font-bold text-parish-dark font-serif mb-2 leading-snug">
                {padre.nome}
              </h3>

              {/* Badge de cargo — mesmo estilo terracota do Nosso Clero */}
              <p className="text-white bg-parish-terracotta text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                {padre.cargo}
              </p>

              {/* In Memoriam para o padre falecido */}
              {padre.falecido && (
                <p className="text-parish-terracotta/70 text-[10px] mt-3 italic font-serif">In Memoriam ✞</p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

import livroImg from '../assets/Produtos/22.png';

// ─────────────────────────────────────
//  SEÇÃO DO LIVRO
// ─────────────────────────────────────
const SecaoLivro = () => {
  const handleOrder = () => {
    const phone = '5511150505716';
    const msg = 'Olá! Gostaria de encomendar o livro *"História de Conquista: O Bairro e a Paróquia"*. Gostaria de saber mais detalhes sobre a retirada. Obrigado!';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section className="py-20 bg-white border-t border-[#e5e0d8]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-br from-parish-dark via-[#2a1f10] to-[#1a1208] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row items-stretch">

          {/* Capa do livro real */}
          <div className="md:w-64 shrink-0 flex flex-col items-center justify-center p-8 bg-black/40">
            <img src={livroImg} alt="Capa do Livro História de Conquista" className="w-[180px] h-auto object-cover rounded shadow-lg border border-parish-gold/30 hover:scale-105 transition-transform" />
          </div>

          {/* Informações */}
          <div className="flex-grow p-8 md:p-12 text-white flex flex-col justify-center gap-4">
            <span className="text-parish-gold text-xs font-bold uppercase tracking-widest">📚 Publicação Paroquial</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold leading-tight">
              História de Conquista:<br />
              <span className="text-parish-gold">O Bairro e a Paróquia</span>
            </h2>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              Um registro histórico e afetivo da nossa comunidade. Um livro que conta como essa terra foi conquistada pela fé,
              pela luta e pela devoção dos moradores do Jardim da Conquista.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <button
                onClick={handleOrder}
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-green-900/30 text-sm"
              >
                <MessageCircle size={18} />
                Encomendar pelo WhatsApp
              </button>
              <div className="text-xs text-white/40 flex items-center justify-center sm:justify-start">
                Retirada na sede da paróquia
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────
//  PÁGINA PRINCIPAL — SOBRE
// ─────────────────────────────────────
const Sobre = () => {
  return (
    <div className="min-h-screen bg-[#f4f1ea] pt-24 md:pt-32 pb-20 overflow-x-hidden">

      {/* --- SEÇÃO 1: HISTÓRIA --- */}
      <section className="max-w-7xl mx-auto px-4 py-8 md:py-16 grid md:grid-cols-2 gap-12 items-center">

        <div className="order-2 md:order-1 relative px-4 md:px-0">
          <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-parish-gold -mt-4 -ml-2 md:-ml-6 pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-parish-gold -mb-4 -mr-2 md:-mr-6 pointer-events-none"></div>
          <div className="rounded-lg overflow-hidden shadow-2xl h-[400px] md:h-[500px]">
            <img src={historyBg} alt="História da Paróquia" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
        </div>

        <div className="order-1 md:order-2 space-y-6 text-center md:text-left">
          <span className="text-parish-terracotta font-bold tracking-widest uppercase text-xs">Nossa História</span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-parish-dark leading-tight">
            Uma comunidade de <span className="text-parish-gold">fé e tradição</span>
          </h1>
          <div className="space-y-4 text-gray-600 text-sm md:text-lg leading-relaxed text-justify">
            <p>A <b>Paróquia São Miguel Arcanjo</b> foi fundada oficialmente em <b>20 de junho de 2006</b>, mas esta é uma história
              iniciada no início da década de 1990. Nasceu do sonho e da fé das famílias desta região, homens e mulheres que em tempos idos enfrentaram
              inúmeras intempéries com um intuito de conquistar um pedaço de terra que pudessem chamar de seu e professar <b>a sua fé.</b></p>
            <p>Hoje, pertencente à <b>Região Episcopal Belém</b>, somos uma grande família formada por 8 comunidades vivas no Jardim da Conquista.</p>
            <p>Sob a espada e a proteção de São Miguel, "Quem como Deus?", seguimos nossa missão de evangelizar e acolher a todos.</p>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO 2: NOSSO CLERO --- */}
      <section className="bg-white/60 py-20 mt-10 border-y border-white/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-parish-gold font-bold tracking-widest uppercase text-xs">Pastores do Rebanho</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-parish-brown mt-2">Nosso Clero</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cleroAtual.map((pessoa, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-xl border border-[#e5e0d8] flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="w-40 h-40 flex-shrink-0 bg-gray-100 rounded-full overflow-hidden border-4 border-parish-gold mb-6 shadow-md">
                  <img src={pessoa.img} alt={pessoa.nome} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-parish-dark font-serif mb-2">{pessoa.nome}</h3>
                <p className="text-white bg-parish-terracotta text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                  {pessoa.cargo}
                </p>
                <p className="text-gray-500 text-sm italic leading-relaxed">"{pessoa.msg}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SEÇÃO 3: CARROSSEL — QUEM FAZ PARTE DA NOSSA HISTÓRIA --- */}
      {/* <CarrosselHistorico /> Oculto temporariamente por pedido do usuário */}

      {/* --- SEÇÃO 4: LIVRO --- */}
      <SecaoLivro />

      {/* --- SEÇÃO 5: FRASE FINAL --- */}
      <section className="bg-parish-dark text-white py-24 text-center relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif italic font-light leading-relaxed opacity-90">
            "Quem como Deus?
            <br /> Ninguém como Deus!"
          </h2>
          <div className="w-80 h-1 bg-parish-gold mx-auto mt-8 rounded-full"></div>
        </div>
      </section>

    </div>
  );
};

export default Sobre;