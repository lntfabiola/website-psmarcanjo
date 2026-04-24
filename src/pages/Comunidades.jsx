import React, { useState } from 'react';
import { MapPin, Clock, Navigation, X, ChevronRight, Copy, Check } from 'lucide-react';

// FOTOS (Mantido o mesmo import de antes)
import imgMatriz from '../assets/comunidades/matriz.jpg';
import imgCoracao from '../assets/comunidades/coracao.jpg';
import imgNatividade from '../assets/comunidades/natividade.jpg';
import imgRita from '../assets/comunidades/santarita.jpg';
import imgImaculada from '../assets/comunidades/imaculada.jpg';
import imgEdwiges from '../assets/comunidades/edwiges.jpg';
import imgCarmo from '../assets/comunidades/carmo.jpg';
import imgDivino from '../assets/comunidades/divino.jpg';

const Comunidades = () => {
  const [selectedCom, setSelectedCom] = useState(null);
  const [copied, setCopied] = useState(false);

  const comunidades = [
    {
      id: 1,
      nome: "Matriz São Miguel Arcanjo",
      endereco: "Travessa Pé de Manacá, 57 - Jardim da Conquista",
      cep: "08345-200",
      bairro: "Jardim da Conquista, SP",
      img: imgMatriz,
      missas: [
        "Domingo: 08h e 10h - Missas",
        "Quarta-feira: 19h30 - Missa",
        "Quarta-feira: 20h - Missa de Louvor e Adoração (1ª quarta do mês)",
        "Quarta-feira: 20h10 - Grupo de Oração",
        "Quinta-feira: 20h - Terço dos Homens",
        "Sexta-feira: 20h - Missa"
      ],
      obs: "Confissões: Sábado 9h-11h30 | Quarta 17h-19h",
      padroeiro: "29 de Setembro"
    },
    {
      id: 2,
      nome: "Sagrado Coração de Jesus",
      endereco: "Tv. Somos Todos Iguais, 312 - Jardim da Conquista",
      cep: "08343-000",
      bairro: "Jardim da Conquista, SP",
      img: imgCoracao,
      missas: [
        "Domingo: 18h - Pastoral da Sobriedade",
        "Terça-feira: 19h30 - Terço Evangelizando com Maria",
        "Sexta-feira: 15h - Terço da Misericórdia",
        "Sexta-feira: 20h - Missa Votiva ao Sagrado Coração (Adoração na 1ª sexta do mês)",
        "Sábado: 19h30 - Missa"
      ],
      padroeiro: "Solenidade do Sagrado Coração"
    },
    {
      id: 3,
      nome: "Natividade de Maria",
      endereco: "Travessa La Violeteira, 44 - Jardim da Conquista",
      cep: "08343-200",
      bairro: "Jardim da Conquista, SP",
      img: imgNatividade,
      missas: [
        "Domingo: 19h30 - Missa",
        "Terça-feira: 19h30 - Grupo de Oração"
      ],
      padroeiro: "08 de Setembro"
    },
    {
      id: 4,
      nome: "Santa Rita de Cássia",
      endereco: "Tv. Menina de Trança, 14 - Jardim da Conquista",
      cep: "08343-350",
      bairro: "Jardim da Conquista, SP",
      img: imgRita,
      missas: [
        "Domingo: 18h - Missa",
        "Sábado: 10h e 16h - Catequese"
      ],
      padroeiro: "22 de Maio"
    },
    {
      id: 5,
      nome: "Imaculada Conceição",
      endereco: "Tv. Sangue Latino, 354 - Jardim da Conquista (Zona Leste)",
      cep: "08343-440",
      bairro: "Jardim da Conquista, SP",
      img: imgImaculada,
      missas: [
        "Domingo: 10h - Missa",
        "Segunda-feira: 19h30 - Grupo de Oração",
        "Quarta-feira: 20h - Terço de São José",
        "Quinta-feira: 20h - Missa pelas almas"
      ],
      padroeiro: "08 de Dezembro"
    },
    {
      id: 6,
      nome: "Santa Edwiges",
      endereco: "R. Belém do Pará, 12 - Jardim da Conquista",
      cep: "08347-640",
      bairro: "Jardim da Conquista, SP",
      img: imgEdwiges,
      missas: [
        "Domingo: 18h - Missa",
        "Terça-feira: 20h - Terço",
        "Quinta-feira: 20h - Círculo bíblico"
      ],
      padroeiro: "16 de Outubro"
    },
    {
      id: 7,
      nome: "Nossa Senhora do Carmo",
      endereco: "R. Nossa Sra. do Carmo, 50 - Jardim da Conquista",
      cep: "08346-590",
      bairro: "Jardim da Conquista, SP",
      img: imgCarmo,
      missas: [
        "Domingo: 10h - Catequese",
        "Sexta-feira: 20h - Terço da familia",
        "Sábado: 18h30 - Catequese",
        "Sábado: 20h - Missa"
      ],
      padroeiro: "16 de Julho"
    },
    {
      id: 8,
      nome: "Divino Espírito Santo",
      endereco: "Tv. Tardes de Lindóia, 14",
      cep: "", // Sem CEP
      bairro: "Jardim da Conquista, SP",
      img: imgDivino,
      missas: [
        "Quinta-feira: 19h30 - Grupo de Oração",
        "Sábado: 18h - Missa"
      ],
      padroeiro: "Pentecostes",
      obs: "Localização aproximada"
    }
  ];

  const handleCopyAddr = (addr) => {
    navigator.clipboard.writeText(addr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNavigate = (addr) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addr)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#f4f1ea] pt-24 md:pt-32 pb-32 md:pb-28 px-4 relative">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12 md:mb-16">
          <span className="text-parish-terracotta font-bold tracking-[0.2em] text-xs uppercase block mb-2">Unidos em Cristo</span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-parish-dark">
            Nossas Comunidades
          </h1>
          <p className="mt-3 md:mt-4 text-sm md:text-lg text-gray-500 max-w-xl mx-auto">
            "Onde dois ou mais estiverem reunidos em meu nome, eu estarei no meio deles."
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {comunidades.map((com) => (
            <div 
              key={com.id} 
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col h-full border border-gray-100"
              onClick={() => setSelectedCom(com)}
            >
              <div className="h-40 md:h-48 overflow-hidden relative bg-parish-dark">
                 <img src={com.img} alt={com.nome} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                 <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-white font-serif font-bold text-base md:text-lg leading-tight shadow-black drop-shadow-md">
                        {com.nome}
                    </h3>
                 </div>
              </div>

              <div className="p-4 md:p-5 flex-1 flex flex-col">
                 <div className="flex items-start gap-2 mb-4 text-sm text-gray-500">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-parish-gold" />
                    <p className="line-clamp-2 leading-snug text-xs">{com.endereco}</p>
                 </div>
                 
                 <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-parish-brown group-hover:text-parish-terracotta">
                    <span>Ver Detalhes</span>
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-parish-terracotta group-hover:text-white transition-colors">
                        <ChevronRight size={16} />
                    </div>
                 </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {selectedCom && (
        <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-center p-0 md:p-4">
            <div className="absolute inset-0 bg-parish-dark/90 backdrop-blur-sm" onClick={() => setSelectedCom(null)}></div>
            
            <div className="relative bg-white w-full md:max-w-4xl h-[85vh] md:h-auto md:max-h-[90vh] overflow-y-auto rounded-t-3xl md:rounded-3xl shadow-2xl flex flex-col md:flex-row animate-slideUp md:animate-scaleIn">
                <button 
                    onClick={() => setSelectedCom(null)} 
                    className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-black transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="w-full md:w-1/2 bg-gray-100 flex flex-col min-h-[250px] md:min-h-[400px]">
                    <div className="h-1/2 md:flex-1 overflow-hidden relative">
                        <img src={selectedCom.img} className="w-full h-full object-cover"/>
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <span className="text-white/90 font-bold tracking-widest text-xs uppercase border border-white/50 px-4 py-2 rounded-full backdrop-blur-md">
                                {selectedCom.padroeiro ? `Festa: ${selectedCom.padroeiro}` : 'Comunidade'}
                            </span>
                        </div>
                    </div>
                    <div className="h-1/2 md:flex-1 relative border-t border-white/20">
                        <iframe 
                            width="100%" 
                            height="100%" 
                            frameBorder="0" 
                            style={{border:0}}
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedCom.endereco + " " + selectedCom.bairro)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>

                <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col bg-white">
                    <div className="md:hidden w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-parish-dark mb-1 leading-tight">{selectedCom.nome}</h2>
                    <p className="text-xs font-bold text-parish-terracotta uppercase tracking-wide mb-6">Paróquia São Miguel Arcanjo</p>
                    
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1"><MapPin size={14}/> Localização</h4>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                {selectedCom.endereco}<br/> {selectedCom.bairro}
                            </p>
                            <div className="flex gap-2">
                                <button onClick={() => handleNavigate(selectedCom.endereco + ", " + selectedCom.bairro)} className="text-xs bg-parish-dark text-white px-4 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-black transition-colors shadow-lg flex-1 justify-center md:flex-none"><Navigation size={14}/> Como Chegar</button>
                                <button onClick={() => handleCopyAddr(selectedCom.endereco)} className="text-xs border border-gray-200 text-gray-600 px-4 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors">{copied ? <Check size={14} className="text-green-600"/> : <Copy size={14}/>}</button>
                            </div>
                        </div>

                        <div className="bg-[#f9f7f4] p-5 rounded-xl border border-[#ebe5de]">
                            <h4 className="text-xs font-bold text-parish-gold uppercase tracking-widest mb-4 flex items-center gap-2"><Clock size={16} className="text-parish-brown"/> Horários</h4>
                            <ul className="space-y-2.5">
                                {selectedCom.missas.map((m, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-sm text-parish-brown font-medium pb-2 border-b border-gray-200/50 last:border-0 last:pb-0">
                                        <div className="w-1.5 h-1.5 bg-parish-terracotta rounded-full shrink-0"></div>
                                        {m}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {selectedCom.obs && (
                            <p className="text-[10px] md:text-xs text-orange-600 bg-orange-50 p-2 rounded text-center border border-orange-100">
                                ℹ️ {selectedCom.obs}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Comunidades;