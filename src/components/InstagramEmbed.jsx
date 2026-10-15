import React from 'react';
import { Instagram } from 'lucide-react';
import { getInstagramEmbedUrl } from '../utils/noticias';

const InstagramEmbed = ({ url, className = '' }) => {
  const embedUrl = getInstagramEmbedUrl(url);

  if (!embedUrl) {
    return (
      <div className={`bg-stone-100 rounded-2xl p-8 text-center text-stone-500 ${className}`}>
        <Instagram size={32} className="mx-auto mb-2 opacity-50" />
        <p className="text-sm">Link do Instagram inválido.</p>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-[420px] mx-auto bg-white rounded-2xl overflow-hidden shadow-xl border border-stone-200 ${className}`}>
      <iframe
        src={embedUrl}
        title="Vídeo do Instagram"
        className="w-full h-[640px] md:h-[720px] border-0"
        loading="lazy"
        allowFullScreen
        scrolling="no"
      />
    </div>
  );
};

export default InstagramEmbed;
