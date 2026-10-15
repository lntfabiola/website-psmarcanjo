import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { PlayCircle, BookOpen, Newspaper, ArrowRight, Calendar, Instagram, Clock } from 'lucide-react';
import { getCategoriaLabel, formatarDataExtenso, tempoLeitura } from '../utils/noticias';

const FILTROS = [
  { value: 'todos', label: 'Todos' },
  { value: 'artigo', label: 'Artigos' },
  { value: 'video', label: 'Vídeos' },
  { value: 'noticia', label: 'Notícias' },
];

const IconeCategoria = ({ categoria, size = 16 }) => {
  if (categoria === 'video') return <PlayCircle size={size} />;
  if (categoria === 'artigo') return <BookOpen size={size} />;
  return <Newspaper size={size} />;
};

// Capa do card: imagem quando houver; senão um fundo nas cores da paróquia
const Capa = ({ item, className = '' }) => {
  if (item.capa) {
    return <img src={item.capa} alt="" loading="lazy" className={`w-full h-full object-cover ${className}`} />;
  }
  const isVideo = item.categoria === 'video';
  return (
    <div className={`w-full h-full flex items-center justify-center ${isVideo
      ? 'bg-gradient-to-br from-parish-dark via-parish-brown to-parish-terracotta'
      : 'bg-gradient-to-br from-parish-light to-parish-beige'} ${className}`}
    >
      {isVideo
        ? <Instagram size={44} className="text-white/40" />
        : <BookOpen size={44} className="text-parish-brown/30" />}
    </div>
  );
};

const CardNoticia = ({ item }) => (
  <Link
    to={`/noticias/${item.id}`}
    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-stone-100 transition-all duration-300 flex flex-col"
  >
    <div className="relative aspect-[16/10] overflow-hidden">
      <Capa item={item} className="group-hover:scale-105 transition-transform duration-500" />
      {item.categoria === 'video' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/25 transition-colors">
          <PlayCircle size={56} className="text-white drop-shadow-lg" strokeWidth={1.5} />
        </div>
      )}
      <span className="absolute top-3 left-3 bg-white/95 text-parish-dark text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1">
        <IconeCategoria categoria={item.categoria} size={12} /> {getCategoriaLabel(item.categoria)}
      </span>
    </div>
    <div className="p-5 md:p-6 flex flex-col flex-1">
      <span className="text-xs text-stone-400 flex items-center gap-1.5 mb-2">
        <Calendar size={12} /> {formatarDataExtenso(item.data)}
      </span>
      <h3 className="font-serif font-bold text-xl text-parish-dark leading-snug mb-2 group-hover:text-parish-terracotta transition-colors">
        {item.titulo}
      </h3>
      {item.resumo && <p className="text-sm text-stone-500 leading-relaxed line-clamp-3">{item.resumo}</p>}
      <span className="mt-auto pt-4 text-xs font-bold uppercase tracking-widest text-parish-gold flex items-center gap-1 group-hover:gap-2 transition-all">
        {item.categoria === 'video' ? 'Assistir' : 'Ler mais'} <ArrowRight size={14} />
      </span>
    </div>
  </Link>
);

const Destaque = ({ item }) => (
  <Link
    to={`/noticias/${item.id}`}
    className="group grid md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-stone-100 transition-all duration-300 mb-10 md:mb-14"
  >
    <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[360px] overflow-hidden">
      <Capa item={item} className="group-hover:scale-105 transition-transform duration-700" />
      {item.categoria === 'video' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <PlayCircle size={72} className="text-white drop-shadow-lg" strokeWidth={1.5} />
        </div>
      )}
    </div>
    <div className="p-6 md:p-10 flex flex-col justify-center">
      <span className="text-parish-terracotta font-bold tracking-[0.2em] text-[10px] uppercase flex items-center gap-1.5 mb-3">
        <IconeCategoria categoria={item.categoria} size={14} /> Em destaque · {getCategoriaLabel(item.categoria)}
      </span>
      <h2 className="font-serif font-bold text-2xl md:text-4xl text-parish-dark leading-tight mb-4 group-hover:text-parish-terracotta transition-colors">
        {item.titulo}
      </h2>
      {item.resumo && <p className="text-stone-500 leading-relaxed mb-6 line-clamp-4">{item.resumo}</p>}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-400">
        {item.autor && <span className="font-semibold text-parish-brown">{item.autor}</span>}
        <span className="flex items-center gap-1"><Calendar size={12} /> {formatarDataExtenso(item.data)}</span>
        {item.categoria !== 'video' && item.conteudo && (
          <span className="flex items-center gap-1"><Clock size={12} /> {tempoLeitura(item.conteudo)} min de leitura</span>
        )}
      </div>
    </div>
  </Link>
);

export default function Noticias() {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('todos');

  useEffect(() => {
    const carregar = async () => {
      try {
        const q = query(collection(db, 'noticias'), orderBy('data', 'desc'));
        const snapshot = await getDocs(q);
        const lista = snapshot.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .filter(n => n.publicado !== false);
        setItens(lista);
      } catch (error) {
        console.error('Erro ao buscar notícias:', error);
      } finally {
        setLoading(false);
      }
    };
    carregar();
  }, []);

  const filtrados = filtro === 'todos' ? itens : itens.filter(n => n.categoria === filtro);
  // O destaque só aparece na aba "Todos"
  const destaque = filtro === 'todos' ? filtrados.find(n => n.destaque) : null;
  const restantes = destaque ? filtrados.filter(n => n.id !== destaque.id) : filtrados;

  return (
    <div className="min-h-screen bg-[#f4f1ea] pt-24 md:pt-32 pb-32 md:pb-28 px-4 relative overflow-hidden">

      {/* Decoração */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/60 rounded-full blur-3xl -mr-40 -mt-40 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Cabeçalho */}
        <div className="text-center mb-8 md:mb-12">
          <span className="text-parish-terracotta font-bold tracking-[0.2em] text-xs uppercase block mb-2">Blog Paroquial</span>
          <h1 className="text-3xl md:text-6xl font-serif font-bold text-parish-dark">
            Notícias e Reflexões
          </h1>
          <p className="mt-3 md:mt-4 text-sm md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Reflexões, artigos, vídeos e as novidades da caminhada da nossa comunidade.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white rounded-full p-1 shadow-sm border border-stone-200 overflow-x-auto max-w-full">
            {FILTROS.map(f => (
              <button
                key={f.value}
                onClick={() => setFiltro(f.value)}
                className={`px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-bold whitespace-nowrap transition-colors ${filtro === f.value
                  ? 'bg-parish-dark text-white'
                  : 'text-stone-500 hover:text-parish-dark'}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-stone-400">Carregando...</div>
        ) : filtrados.length === 0 ? (
          <div className="text-center py-20 text-stone-400">
            <Newspaper size={40} className="mx-auto mb-3 opacity-40" />
            <p>Nenhuma publicação por aqui ainda.</p>
          </div>
        ) : (
          <>
            {destaque && <Destaque item={destaque} />}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {restantes.map(item => <CardNoticia key={item.id} item={item} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
