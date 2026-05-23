import React, { useState } from 'react';
import { Heart, QrCode, Copy, Check, Building, Globe, Users, ArrowRight } from 'lucide-react';

import qrCodeImg from '../assets/qr-code.jpeg';

const Dizimo = () => {
  const [copied, setCopied] = useState(false);

  const chavePixTexto = "63.089.825/0502-49";

  const handleCopy = () => {
    navigator.clipboard.writeText(chavePixTexto);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f4f1ea] pt-32 pb-20 relative overflow-hidden">

      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/40 rounded-full blur-3xl pointer-events-none -mt-40 -mr-20"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* --- CABEÇALHO --- */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-parish-terracotta/10 text-parish-terracotta px-4 py-1.5 rounded-full mb-4">
            <Heart size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Oferta e Gratidão</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-parish-dark mb-4">
            Contribua com o Dízimo
          </h1>
          <div className="max-w-2xl mx-auto">
            <div className="h-1 w-20 bg-parish-gold mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-600 leading-relaxed">
              Sua oferta mantém nossa igreja de portas abertas, sustenta as obras sociais e leva a palavra de Deus mais longe.
              <br className="hidden md:block" />
              Toda contribuição, de qualquer valor, é bem-vinda e abençoada.
            </p>
          </div>
        </div>

        {/* --- OS 3 MOTIVOS --- */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto">

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building size={24} />
            </div>
            <h3 className="font-serif font-bold text-lg mb-2 text-parish-dark">Manutenção</h3>
            <p className="text-gray-500 text-xs leading-relaxed">Cuida do templo, luz, água e funcionários.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-orange-50 text-parish-gold rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe size={24} />
            </div>
            <h3 className="font-serif font-bold text-lg mb-2 text-parish-dark">Evangelização</h3>
            <p className="text-gray-500 text-xs leading-relaxed">Sustenta catequese, comunicação e eventos.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={24} />
            </div>
            <h3 className="font-serif font-bold text-lg mb-2 text-parish-dark">Social</h3>
            <p className="text-gray-500 text-xs leading-relaxed">Ajuda aos irmãos carentes assistidos.</p>
          </div>

        </div>

        {/* --- ÁREA DO PIX --- */}
        <div className="max-w-2xl mx-auto bg-parish-dark rounded-3xl shadow-2xl overflow-hidden relative">

          {/* Decoração */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-parish-gold via-parish-dark to-parish-dark"></div>

          <div className="relative z-10 p-8 md:p-12 text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-white/10 rounded-full">
                <QrCode size={40} className="text-parish-gold" />
              </div>
            </div>

            <h2 className="text-3xl font-serif font-bold mb-2">Contribuição Digital</h2>
            <p className="text-white/60 text-sm mb-8">Abra o app do seu banco e escaneie</p>

            {/* QR CODE */}
            <div className="bg-white p-4 rounded-2xl inline-block shadow-lg mb-8 group hover:scale-105 transition-transform duration-500">
              <img
                src={qrCodeImg}
                alt="QR Code do PIX"
                className="w-48 h-auto md:w-64 md:h-auto mx-auto"
              />
              <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest">
                Confirme os dados antes de pagar
              </p>
            </div>

            {/* Copiar Chave */}
            <div className="space-y-3 max-w-sm mx-auto">
              <p className="text-xs font-bold text-parish-gold uppercase tracking-widest opacity-80">
                Chave CNPJ
              </p>
              <button
                onClick={handleCopy}
                className="w-full bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-4 flex items-center justify-between group transition-all backdrop-blur-md cursor-pointer"
              >
                <span className="font-mono font-semibold tracking-wide">
                  {chavePixTexto}
                </span>
                {copied ? <Check className="text-green-400 shrink-0" /> : <Copy className="text-white/70 group-hover:text-white shrink-0" />}
              </button>

              <p className="text-xs h-4 font-medium transition-colors" style={{ color: copied ? '#4ade80' : '#ffffff60' }}>
                {copied ? "Chave copiada!" : "Toque para copiar a chave"}
              </p>
            </div>

            {/* Rodapé do Cartão */}
            <div className="mt-8 pt-6 border-t border-white/10 text-xs md:text-sm text-white/50 space-y-1">
              <p className="uppercase tracking-wide font-bold text-white">Paróquia São Miguel Arcanjo</p>
              <p>Mitra Arquidiocesana de São Paulo</p>
            </div>

          </div>
        </div>

        {/* Botão de Enviar Comprovante */}
        <div className="text-center mt-12">
          <a
            href={`https://wa.me/551150505716?text=Ola, gostaria de enviar o comprovante de um dízimo para a Paróquia.`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-parish-terracotta hover:text-parish-dark font-bold text-sm uppercase tracking-wide border-b border-parish-terracotta/30 hover:border-parish-dark pb-1 transition-all"
          >
            Enviar Comprovante (WhatsApp) <ArrowRight size={16} />
          </a>
        </div>

      </div>
    </div>
  );
};

export default Dizimo;