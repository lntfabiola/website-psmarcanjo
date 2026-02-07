import React from 'react';
import { Clock, MapPin, ArrowRight, Calendar, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { eventosDB } from '../data/eventos'; 

const AgendaPreview = () => {
  const hoje = new Date(); // Agora pega a data atual real, não uma fixa.
  
  const proximosEventos = eventosDB
    .filter(evt => new Date(evt.data + 'T12:00:00') >= hoje)
    .sort((a, b) => new Date(a.data) - new Date(b.data))
    .slice(0, 4); 

  const getDiaMes = (dataString) => {
    const data = new Date(dataString + 'T12:00:00');
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = data.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', ''); 
    return { dia, mes };
  };

  return (
    <section id="agenda" className="px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Título */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 pb-4 border-b border-[#e5e0d8]">
           <div className="text-center md:text-left w-full md:w-auto">
              <span className="block text-parish-terracotta font-bold tracking-[0.2em] text-xs uppercase mb-2">
                Programação
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-parish-dark">
                Agenda <span className="italic text-parish-brown">Paroquial</span>
              </h2>
           </div>
           
           <Link to="/agenda" className="hidden md:flex items-center gap-2 text-parish-dark hover:text-parish-gold transition-colors text-xs font-bold uppercase tracking-widest mb-1">
              Ver calendário completo <ArrowRight size={14}/>
           </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* Coluna Esquerda: Rotina */}
          <div className="lg:col-span-1 bg-parish-dark text-white rounded-xl md:rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl flex flex-col border border-white/5 h-full">
            {/* ... (o conteúdo da rotina semanal continua o mesmo, não precisa mudar) ... */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

            <div className="relative z-10">
                {/* Cabeçalho Card */}
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
                    <div>
                        <h3 className="font-serif text-2xl text-parish-gold font-bold">Semana</h3>
                        <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wide">Missa & Confissão</p>
                    </div>
                    <div className="bg-white/10 p-2 rounded-lg"><Clock size={20} className="text-parish-gold"/></div>
                </div>

                {/* Bloco Confissão */}
                <div className="bg-white/5 rounded-lg p-4 mb-8 border border-white/5">
                    <div className="flex items-center gap-2 mb-3">
                        <Star size={12} className="text-yellow-500 fill-current"/>
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-300">Confissões (Matriz)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <div className="flex flex-col"><span className="text-gray-500 text-[10px] uppercase">Quarta</span><span>17h - 19h</span></div>
                        <div className="w-[1px] bg-white/10 mx-2"></div>
                        <div className="flex flex-col text-right"><span className="text-gray-500 text-[10px] uppercase">Sábado</span><span>09h - 11:30</span></div>
                    </div>
                </div>

                {/* Missas Semana */}
                <div className="space-y-3 mb-8">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-300">Quarta <span className="text-[10px] text-gray-500">(Matriz)</span></span>
                        <span className="font-bold text-parish-gold font-mono">19:30</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-300">Quinta <span className="text-[10px] text-gray-500">(Imaculada)</span></span>
                        <span className="font-bold text-parish-gold font-mono">20:00</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-300">Sexta <span className="text-[10px] text-gray-500">(Matriz)</span></span>
                        <span className="font-bold text-parish-gold font-mono">20:00</span>
                    </div>
                </div>

                {/* Final de Semana */}
                <div className="space-y-6 pt-4 border-t border-white/10 mt-auto">
                    <div>
                        <h4 className="text-xs font-bold text-parish-terracotta uppercase tracking-wide mb-2">Sábado</h4>
                        <ul className="text-xs space-y-1.5 text-gray-300">
                            <li className="flex justify-between"><span>Divino Espírito Santo</span> <span className="font-bold text-white">18:00</span></li>
                            <li className="flex justify-between"><span>Sagrado Coração</span> <span className="font-bold text-white">19:30</span></li>
                            <li className="flex justify-between"><span>N. Sra. do Carmo</span> <span className="font-bold text-white">20:00</span></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold text-parish-terracotta uppercase tracking-wide mb-2">Domingo</h4>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-gray-300">
                            <div className="flex justify-between border-b border-white/5 pb-1">
                                <span>Matriz</span> <span className="font-bold text-white">08h | 10h</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-1">
                                <span>Imaculada</span> <span className="font-bold text-white">10:00</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-1">
                                <span>Sta. Rita</span> <span className="font-bold text-white">18:00</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-1">
                                <span>Sta. Edwiges</span> <span className="font-bold text-white">18:00</span>
                            </div>
                            <div className="col-span-2 flex justify-between border-b border-white/5 pb-1">
                                <span>Natividade</span> <span className="font-bold text-white">19:30</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          
          {/* Coluna Direita: Destaques */}
          <div className="lg:col-span-2 h-full flex flex-col">
             <div className="bg-white p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                    <Calendar className="text-parish-terracotta" size={24} />
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-parish-dark">Destaques</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4 flex-1">
                    {proximosEventos.length > 0 ? proximosEventos.map((evt, index) => {
                        const { dia, mes } = getDiaMes(evt.data);
                        return (
                        // AQUI ESTÁ A MUDANÇA: O 'state' vai levar a data do evento
                        <Link to="/agenda" state={{ selectedDate: evt.data }} key={index} className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-[#fbfaf9] hover:border-parish-gold/50 transition-all group hover:shadow-md h-full">
                            <div className="flex flex-col items-center justify-center w-14 h-14 bg-white rounded-lg shadow-sm border border-gray-200 group-hover:border-parish-terracotta shrink-0">
                                <span className="font-bold text-lg leading-none text-parish-dark">{dia}</span>
                                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">{mes}</span>
                            </div>
                            <div className="min-w-0 flex flex-col justify-center"> 
                                <h4 className="font-serif font-bold text-sm md:text-base text-parish-dark leading-tight group-hover:text-parish-terracotta transition-colors line-clamp-2">
                                    {evt.titulo}
                                </h4>
                                <div className="text-xs text-gray-500 font-medium flex flex-wrap gap-2 mt-1">
                                    {evt.hora && <span className="flex items-center gap-1"><Clock size={10}/> {evt.hora}</span>}
                                    {evt.local && <span className="flex items-center gap-1"><MapPin size={10}/> {evt.local}</span>}
                                </div>
                            </div>
                        </Link>
                        )
                    }) : (
                        <div className="col-span-2 text-center py-8 text-gray-400">Nenhum evento em destaque.</div>
                    )}
                </div>
                <div className="mt-8 flex justify-end pt-4 border-t border-gray-50">
                    <Link to="/agenda" className="text-xs font-bold text-parish-gold hover:text-parish-brown uppercase tracking-widest flex items-center gap-2 transition-colors group">
                        Calendário Completo <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                    </Link>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AgendaPreview;