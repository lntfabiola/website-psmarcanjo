import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase'; 
import { Lock, Unlock, Plus, Edit2, Trash2, X, Calendar as CalendarIcon, MapPin, Clock, ChevronLeft, ChevronRight, Bell } from 'lucide-react';

const MESES = ['JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO', 'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'];
const DIAS_SEMANA = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

export default function Agenda() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const [selectedDate, setSelectedDate] = useState(new Date()); 

  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [password, setPassword] = useState('');

  const [showFormModal, setShowFormModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    data: '', titulo: '', tipo: 'comum', hora: '', local: ''
  });

  const fetchEventos = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'agenda_eventos'), orderBy('data', 'asc'));
      const snapshot = await getDocs(q);
      const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEventos(lista);
    } catch (error) {
      console.error("Erro ao buscar agenda:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const eventosPorData = eventos.reduce((acc, evento) => {
    if (!acc[evento.data]) acc[evento.data] = [];
    acc[evento.data].push(evento);
    return acc;
  }, {});

  const formatDateToString = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const selectedDateString = formatDateToString(selectedDate);
  
  // Pegar os eventos do dia e ORDENAR POR HORÁRIO
  const eventosDoDiaSelecionado = [...(eventosPorData[selectedDateString] || [])].sort((a, b) => {
    const horaA = a.hora || '24:00'; // Eventos sem hora vão pro final
    const horaB = b.hora || '24:00';
    return horaA.localeCompare(horaB);
  });

  const getDotColor = (tipo) => {
    switch(tipo) {
      case 'importante': return 'bg-parish-terracotta'; 
      case 'verde': return 'bg-green-600';
      case 'festa': return 'bg-parish-gold'; 
      case 'festa-box': return 'bg-parish-brown'; 
      default: return 'bg-gray-400'; 
    }
  };

  // Nomes amigáveis para as categorias
  const getDisplayTipo = (tipo) => {
    switch(tipo) {
      case 'comum': return 'Geral';
      case 'verde': return 'Atividade';
      case 'festa': return 'Festa';
      case 'festa-box': return 'Destaque';
      case 'importante': return 'Importante';
      default: return tipo;
    }
  };

  const handleReminder = (evento) => {
    const dataStr = evento.data.replace(/-/g, ''); 
    let startTime = '090000';
    let endTime = '100000';
    
    if(evento.hora) {
        const timePart = evento.hora.split('-')[0].trim(); 
        const [h, m] = timePart.split(':');
        if(h && m) {
            startTime = `${h}${m}00`;
            const endH = String((parseInt(h) + 1) % 24).padStart(2, '0');
            endTime = `${endH}${m}00`;
        }
    }
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(evento.titulo)}&dates=${dataStr}T${startTime}/${dataStr}T${endTime}&details=${encodeURIComponent('Programação da Paróquia São Miguel Arcanjo')}&location=${encodeURIComponent(evento.local || 'Paróquia São Miguel Arcanjo')}`;
    window.open(url, '_blank');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'Psma57**') {
      setIsAdmin(true);
      setShowLoginModal(false);
      setPassword('');
    } else {
      alert('Senha incorreta!');
    }
  };

  const handleNewEvent = () => {
    setFormData({ data: selectedDateString, titulo: '', tipo: 'comum', hora: '', local: '' });
    setEditingId(null);
    setShowFormModal(true);
  };

  const handleEdit = (evento) => {
    setFormData({
      data: evento.data, titulo: evento.titulo, tipo: evento.tipo || 'comum', hora: evento.hora || '', local: evento.local || ''
    });
    setEditingId(evento.id);
    setShowFormModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, 'agenda_eventos', editingId), formData);
      } else {
        await addDoc(collection(db, 'agenda_eventos'), formData);
      }
      setShowFormModal(false);
      fetchEventos();
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este evento?')) {
      try {
        await deleteDoc(doc(db, 'agenda_eventos', id));
        fetchEventos();
      } catch (error) {
        console.error("Erro ao excluir:", error);
      }
    }
  };

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="bg-gray-50 border-r border-b border-gray-100 p-2 min-h-[80px]"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, month, day);
      const dateStr = formatDateToString(dateObj);
      const isSelected = dateStr === selectedDateString;
      const isSunday = dateObj.getDay() === 0;
      const dayEvents = eventosPorData[dateStr] || [];

      days.push(
        <div 
          key={day} 
          onClick={() => setSelectedDate(dateObj)}
          className={`relative bg-white border-r border-b border-gray-100 p-2 min-h-[80px] cursor-pointer transition-colors hover:bg-parish-light/30
            ${isSelected ? 'ring-2 ring-inset ring-parish-gold z-10' : ''}`}
        >
          <span className={`text-sm font-bold ${isSunday ? 'text-parish-terracotta' : 'text-gray-700'}`}>
            {day}
          </span>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {dayEvents.map((ev, idx) => (
              <div key={idx} className={`w-1.5 h-1.5 rounded-full ${getDotColor(ev.tipo)}`} title={ev.titulo}></div>
            ))}
          </div>
        </div>
      );
    }
    return days;
  };

  const getNomeDiaSemana = (date) => {
    const dias = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    return dias[date.getDay()];
  };

  return (
    <div className="min-h-screen bg-parish-light pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* CABEÇALHO */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-[10px] text-parish-gold uppercase font-bold tracking-widest mb-1">Liturgia & Eventos</h2>
            <h1 className="text-4xl text-parish-dark font-serif font-bold">
              Agenda <span className="italic font-light">Paroquial</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            {isAdmin && (
              <button onClick={handleNewEvent} className="flex items-center gap-2 bg-parish-gold text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#83623b] transition shadow-md">
                <Plus size={16} /> Adicionar
              </button>
            )}
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm font-bold shadow-sm">
              <CalendarIcon size={16} className="text-parish-gold" />
              {currentDate.getFullYear()}
            </div>
          </div>
        </div>

        {/* CALENDÁRIO */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-parish-dark text-white flex items-center justify-between p-4">
            <button onClick={handlePrevMonth} className="p-1 hover:bg-white/10 rounded transition"><ChevronLeft /></button>
            <h2 className="text-lg font-bold tracking-widest">{MESES[currentDate.getMonth()]}</h2>
            <button onClick={handleNextMonth} className="p-1 hover:bg-white/10 rounded transition"><ChevronRight /></button>
          </div>

          <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
            {DIAS_SEMANA.map((dia) => (
              <div key={dia} className="text-center py-2 text-[10px] font-bold text-gray-500 border-r border-gray-100 last:border-r-0">
                {dia}
              </div>
            ))}
          </div>

          {loading ? (
             <div className="h-64 flex items-center justify-center">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-parish-gold"></div>
             </div>
          ) : (
            <div className="grid grid-cols-7">
              {renderCalendarDays()}
            </div>
          )}
        </div>

        {/* CARTÃO DE PROGRAMAÇÃO (LISTA DO DIA) */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-4 border-b border-gray-100 pb-6 mb-6">
            <div className="w-14 h-14 bg-parish-dark text-white rounded-2xl flex items-center justify-center text-2xl font-bold font-serif shadow-inner">
              {selectedDate.getDate()}
            </div>
            <div>
              <h3 className="font-bold text-parish-dark text-xl">Programação</h3>
              <p className="text-sm text-gray-500 capitalize">{MESES[selectedDate.getMonth()].toLowerCase()} • {getNomeDiaSemana(selectedDate)}</p>
            </div>
          </div>

          <div className="space-y-4">
            {eventosDoDiaSelecionado.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Não há programação registrada para esta data.</p>
            ) : (
              eventosDoDiaSelecionado.map(evento => (
                <div key={evento.id} className="bg-parish-light/30 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-parish-light hover:border-parish-gold/30 transition">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-2 h-2 rounded-full ${getDotColor(evento.tipo)}`}></div>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-gray-500">
                        {getDisplayTipo(evento.tipo)}
                      </span>
                    </div>
                    <h4 className="font-bold text-parish-dark text-lg mb-2">{evento.titulo}</h4>
                    
                    <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-600">
                      {evento.hora && (
                        <span className="flex items-center gap-1"><Clock size={14} className="text-parish-gold"/> {evento.hora}</span>
                      )}
                      {evento.local && (
                        <span className="flex items-center gap-1"><MapPin size={14} className="text-parish-gold"/> {evento.local}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 w-full md:w-auto border-t md:border-t-0 md:border-l border-gray-200 pt-3 md:pt-0 md:pl-4">
                    <button onClick={() => handleReminder(evento)} className="flex-1 md:flex-none p-2 text-gray-500 bg-white border border-gray-200 hover:text-parish-gold hover:border-parish-gold rounded-lg transition flex justify-center shadow-sm" title="Adicionar Lembrete">
                      <Bell size={16} />
                    </button>
                    
                    {isAdmin && (
                      <>
                        <button onClick={() => handleEdit(evento)} className="flex-1 md:flex-none p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition flex justify-center" title="Editar">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(evento.id)} className="flex-1 md:flex-none p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition flex justify-center" title="Excluir">
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RODAPÉ: BOTÃO ADMIN */}
        <div className="mt-12 flex justify-center">
          <button 
            onClick={() => isAdmin ? setIsAdmin(false) : setShowLoginModal(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition
              ${isAdmin ? 'text-red-600 bg-red-50 hover:bg-red-100' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-200'}`}
          >
            {isAdmin ? <><Unlock size={14}/> Sair do modo edição</> : <><Lock size={14}/> Acesso da Secretaria</>}
          </button>
        </div>

      </div>

      {/* MODAL DE LOGIN ADMIN */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-serif text-parish-dark">Acesso da Secretaria</h2>
              <button onClick={() => setShowLoginModal(false)} className="text-gray-400 hover:text-black"><X size={24}/></button>
            </div>
            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-parish-gold outline-none text-center tracking-widest text-lg"
                  placeholder="••••••••"
                  autoFocus
                />
              </div>
              <button type="submit" className="w-full bg-parish-dark text-white font-bold py-3 rounded-xl hover:bg-black transition">
                Acessar Edição
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE FORMULÁRIO DE EVENTO */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-xl font-bold font-serif text-parish-dark">
                {editingId ? 'Editar Evento' : 'Novo Evento'}
              </h2>
              <button onClick={() => setShowFormModal(false)} className="text-gray-400 hover:text-black"><X size={24}/></button>
            </div>
            
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Data *</label>
                <input type="date" required value={formData.data} onChange={(e) => setFormData({...formData, data: e.target.value})} className="w-full border-2 border-gray-200 rounded-xl p-2.5 focus:border-parish-gold outline-none" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Título do Evento *</label>
                <input type="text" required value={formData.titulo} onChange={(e) => setFormData({...formData, titulo: e.target.value})} className="w-full border-2 border-gray-200 rounded-xl p-2.5 focus:border-parish-gold outline-none" placeholder="Ex: Santa Missa" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Horário</label>
                  <input type="text" value={formData.hora} onChange={(e) => setFormData({...formData, hora: e.target.value})} className="w-full border-2 border-gray-200 rounded-xl p-2.5 focus:border-parish-gold outline-none" placeholder="Ex: 19:00" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Local</label>
                  <input type="text" value={formData.local} onChange={(e) => setFormData({...formData, local: e.target.value})} className="w-full border-2 border-gray-200 rounded-xl p-2.5 focus:border-parish-gold outline-none" placeholder="Ex: Matriz" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Categoria</label>
                <select value={formData.tipo} onChange={(e) => setFormData({...formData, tipo: e.target.value})} className="w-full border-2 border-gray-200 rounded-xl p-2.5 focus:border-parish-gold outline-none bg-white">
                  <option value="comum">Geral (Cinza)</option>
                  <option value="festa">Festa (Dourado)</option>
                  <option value="importante">Importante (Terracota)</option>
                  <option value="verde">Atividade (Verde)</option>
                  <option value="festa-box">Destaque (Marrom)</option>
                </select>
              </div>

              <div className="pt-6 flex gap-3">
                <button type="button" onClick={() => setShowFormModal(false)} className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-200 transition">
                  Cancelar
                </button>
                <button type="submit" className="flex-1 bg-parish-gold text-white font-bold py-3 rounded-xl hover:bg-[#83623b] transition">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}