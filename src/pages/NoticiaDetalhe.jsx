import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { ArrowLeft, Calendar, Clock, Share2, Instagram, Check } from 'lucide-react';
import InstagramEmbed from '../components/InstagramEmbed';
import ConteudoArtigo from '../components/ConteudoArtigo';
import { getCategoriaLabel, formatarDataExtenso, tempoLeitura } from '../utils/noticias';

export default function NoticiaDetalhe() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    const carregar = async () => {
      setLoading(true);
      try {
        const snap = await getDoc(doc(db, 'noticias', id));
        setItem(snap.exists() && snap.data().publicado !== false ? { id: snap.id, ...snap.data() } : null);
      } catch (error) {
        console.error('Erro ao carregar publicação:', error);
        setItem(null);
      } finally {
        setLoading(false);
      }
    };
    carregar();
  }, [id]);

  useEffect(() => {
    if (item) document.title = `${item.titulo} | Paróquia São Miguel Arcanjo`;
    return () => { document.title = 'Paróquia São Miguel Arcanjo'; };
  }, [item]);

  const compartilhar = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: item.titulo, text: item.resumo || '', url }); } catch { /* cancelado */ }
    } else {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-[#f4f1ea] pt-40 text-center text-stone-400">Carregando...</div>;
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-[#f4f1ea] pt-40 px-4 text-center">
        <h1 className="text-3xl font-serif font-bold text-parish-dark mb-3">Publicação não encontrada</h1>
        <Link to="/noticias" className="text-parish-terracotta font-bold hover:underline">← Voltar para Notícias</Link>
      </div>
    );
  }

  const isVideo = item.categoria === 'video';

  return (
    <div className="min-h-screen bg-[#f4f1ea] pt-24 md:pt-32 pb-32 md:pb-28 px-4">
      <article className="max-w-3xl mx-auto">

        <Link to="/noticias" className="inline-flex items-center gap-2 text-sm font-bold text-stone-500 hover:text-parish-dark mb-8 transition-colors">
          <ArrowLeft size={16} /> Notícias
        </Link>

        {/* Cabeçalho */}
        <header className="mb-8 md:mb-10">
          <span className="text-parish-terracotta font-bold tracking-[0.2em] text-xs uppercase block mb-3">
            {getCategoriaLabel(item.categoria)}
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-parish-dark leading-tight mb-4">
            {item.titulo}
          </h1>
          {item.resumo && (
            <p className="text-lg md:text-xl text-stone-500 leading-relaxed mb-6">{item.resumo}</p>
          )}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-stone-400 border-y border-stone-200 py-4">
            {item.autor && <span className="font-semibold text-parish-brown">{item.autor}</span>}
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {formatarDataExtenso(item.data)}</span>
            {!isVideo && item.conteudo && (
              <span className="flex items-center gap-1.5"><Clock size={14} /> {tempoLeitura(item.conteudo)} min de leitura</span>
            )}
            <button onClick={compartilhar} className="ml-auto flex items-center gap-1.5 font-bold text-parish-gold hover:text-parish-dark transition-colors">
              {copiado ? <><Check size={14} /> Link copiado</> : <><Share2 size={14} /> Compartilhar</>}
            </button>
          </div>
        </header>

        {/* Vídeo do Instagram */}
        {item.instagramUrl && (
          <div className="mb-10">
            <InstagramEmbed url={item.instagramUrl} />
            <a
              href={item.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 text-sm font-bold text-stone-500 hover:text-parish-terracotta transition-colors"
            >
              <Instagram size={16} /> Ver no Instagram
            </a>
          </div>
        )}

        {/* Capa (artigos) */}
        {!isVideo && item.capa && (
          <img src={item.capa} alt="" className="w-full rounded-2xl shadow-lg mb-10 object-cover max-h-[480px]" />
        )}

        {/* Texto */}
        {item.conteudo && <ConteudoArtigo texto={item.conteudo} />}

        {/* Assinatura do autor ao final do artigo */}
        {!isVideo && item.autor && (
          <div className="mt-14 pt-8 border-t border-stone-200 text-center">
            <span className="block text-parish-gold text-2xl mb-2">✠</span>
            <p className="font-serif italic text-lg text-parish-brown">{item.autor}</p>
          </div>
        )}
      </article>
    </div>
  );
}
