import React, { useState, useEffect } from 'react';
import { db } from '../services/firebaseConnection';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import {
    Lock, LogIn, LogOut, Plus, Pencil, Trash2, X, CheckCircle,
    Calendar, Clock, MapPin, Tag, AlertTriangle, CalendarDays, RefreshCw
} from 'lucide-react';

const SENHA_ADMIN = "Psma57**";

const TIPOS = [
    { value: 'comum', label: 'Comum (cinza)', cor: 'bg-gray-400' },
    { value: 'importante', label: 'Importante (laranja)', cor: 'bg-orange-500' },
    { value: 'festa', label: 'Festa (vermelho)', cor: 'bg-red-500' },
    { value: 'festa-box', label: 'Destaque Especial (vermelho forte)', cor: 'bg-red-600' },
    { value: 'verde', label: 'Formação/Pastoral (verde)', cor: 'bg-green-500' },
];

const eventoVazio = { titulo: '', data: '', hora: '', local: '', tipo: 'comum' };

const AdminAgenda = () => {
    const [senha, setSenha] = useState('');
    const [logado, setLogado] = useState(false);
    const [loginErro, setLoginErro] = useState(false);
    const [loading, setLoading] = useState(false);
    const [salvando, setSalvando] = useState(false);
    const [eventos, setEventos] = useState([]);
    const [filtroMes, setFiltroMes] = useState(() => {
        const hoje = new Date();
        return `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}`;
    });

    // Modal de formulário
    const [modalAberto, setModalAberto] = useState(false);
    const [editando, setEditando] = useState(null); // null = novo, id = editar
    const [form, setForm] = useState(eventoVazio);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const carregarEventos = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, 'agenda_eventos'), orderBy('data', 'asc'));
            const snapshot = await getDocs(q);
            const lista = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            setEventos(lista);
        } catch (err) {
            console.error('Erro ao carregar:', err);
        }
        setLoading(false);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (senha === SENHA_ADMIN) {
            setLogado(true);
            setLoginErro(false);
            carregarEventos();
        } else {
            setLoginErro(true);
            setSenha('');
        }
    };

    const abrirNovo = () => {
        setEditando(null);
        setForm(eventoVazio);
        setModalAberto(true);
    };

    const abrirEditar = (evt) => {
        setEditando(evt.id);
        setForm({ titulo: evt.titulo, data: evt.data, hora: evt.hora || '', local: evt.local || '', tipo: evt.tipo || 'comum' });
        setModalAberto(true);
    };

    const salvar = async (e) => {
        e.preventDefault();
        if (!form.titulo || !form.data) return;
        setSalvando(true);
        try {
            const payload = { titulo: form.titulo.trim(), data: form.data, hora: form.hora.trim(), local: form.local.trim(), tipo: form.tipo };
            if (editando) {
                await updateDoc(doc(db, 'agenda_eventos', editando), payload);
            } else {
                await addDoc(collection(db, 'agenda_eventos'), payload);
            }
            setModalAberto(false);
            await carregarEventos();
        } catch (err) {
            console.error('Erro ao salvar:', err);
        }
        setSalvando(false);
    };

    const handleExcluir = async (id) => {
        try {
            await deleteDoc(doc(db, 'agenda_eventos', id));
            setConfirmDelete(null);
            await carregarEventos();
        } catch (err) {
            console.error('Erro ao excluir:', err);
        }
    };

    const eventosFiltrados = eventos.filter(e => {
        if (!filtroMes) return true;
        return e.data && e.data.startsWith(filtroMes);
    });

    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const formatarData = (dataStr) => {
        if (!dataStr) return '';
        const [ano, mes, dia] = dataStr.split('-');
        return `${dia}/${mes}/${ano}`;
    };
    const getTipoCor = (tipo) => {
        const t = TIPOS.find(t => t.value === tipo);
        return t ? t.cor : 'bg-gray-400';
    };

    // --- TELA DE LOGIN ---
    if (!logado) {
        return (
            <div className="min-h-screen bg-parish-dark flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-sm w-full text-center">
                    <div className="w-16 h-16 bg-parish-light rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock size={30} className="text-parish-brown" />
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-gray-800 mb-1">Administração</h2>
                    <p className="text-gray-500 text-sm mb-6">Gerenciar Agenda Paroquial</p>

                    {loginErro && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-sm">
                            <AlertTriangle size={16} /> Senha incorreta. Tente novamente.
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            placeholder="Senha de acesso"
                            autoFocus
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-parish-gold text-center tracking-widest text-lg"
                            value={senha}
                            onChange={e => { setSenha(e.target.value); setLoginErro(false); }}
                        />
                        <button className="w-full bg-parish-dark hover:bg-black text-white font-bold py-3 rounded-xl flex justify-center items-center gap-2 transition-all shadow-lg">
                            <LogIn size={20} /> Entrar
                        </button>
                    </form>
                    <a href="/" className="block mt-6 text-xs text-gray-400 hover:text-gray-600 transition-colors">← Voltar ao site</a>
                </div>
            </div>
        );
    }

    // --- PAINEL ADMIN ---
    return (
        <div className="min-h-screen bg-gray-50 pt-8 pb-20">
            <div className="max-w-6xl mx-auto px-4">

                {/* Cabeçalho */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <span className="text-xs uppercase tracking-widest font-bold text-parish-terracotta">Painel Administrativo</span>
                        <h1 className="text-3xl font-serif font-bold text-parish-dark flex items-center gap-3 mt-1">
                            <CalendarDays className="text-parish-gold" /> Agenda Paroquial
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">{eventos.length} evento(s) no banco de dados</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={carregarEventos} title="Atualizar" className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-100 transition">
                            <RefreshCw size={18} />
                        </button>
                        <button
                            onClick={abrirNovo}
                            className="flex items-center gap-2 bg-parish-terracotta hover:bg-red-800 text-white font-bold px-5 py-2.5 rounded-xl transition-all shadow-md"
                        >
                            <Plus size={20} /> Novo Evento
                        </button>
                        <button onClick={() => setLogado(false)} title="Sair" className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-500 transition">
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>

                {/* Filtro por mês */}
                <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex flex-wrap items-center gap-3">
                    <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Filtrar por mês:</span>
                    <input
                        type="month"
                        className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-parish-gold"
                        value={filtroMes}
                        onChange={e => setFiltroMes(e.target.value)}
                    />
                    {filtroMes && (
                        <button onClick={() => setFiltroMes('')} className="text-xs text-gray-400 hover:text-gray-600 underline">Mostrar todos</button>
                    )}
                    <span className="ml-auto text-sm text-gray-400">{eventosFiltrados.length} evento(s) encontrado(s)</span>
                </div>

                {/* Lista de Eventos */}
                {loading ? (
                    <div className="text-center py-20 text-gray-400">Carregando eventos...</div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        {eventosFiltrados.length === 0 ? (
                            <div className="text-center py-20 text-gray-400">
                                <CalendarDays size={40} className="mx-auto mb-3 opacity-40" />
                                <p>Nenhum evento encontrado para este período.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {eventosFiltrados.map(evt => (
                                    <div key={evt.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors group">
                                        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${getTipoCor(evt.tipo)}`} />
                                        <div className="min-w-[100px]">
                                            <span className="text-sm font-bold text-parish-dark font-mono">{formatarData(evt.data)}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-parish-dark text-sm truncate">{evt.titulo}</p>
                                            <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
                                                {evt.hora && <span className="flex items-center gap-1"><Clock size={11}/> {evt.hora}</span>}
                                                {evt.local && <span className="flex items-center gap-1"><MapPin size={11}/> {evt.local}</span>}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => abrirEditar(evt)}
                                                className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                                                title="Editar"
                                            >
                                                <Pencil size={15} />
                                            </button>
                                            <button
                                                onClick={() => setConfirmDelete(evt)}
                                                className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                                                title="Excluir"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* MODAL FORMULÁRIO */}
            {modalAberto && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModalAberto(false)} />
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-scaleIn">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h2 className="text-xl font-serif font-bold text-parish-dark">
                                {editando ? 'Editar Evento' : 'Novo Evento'}
                            </h2>
                            <button onClick={() => setModalAberto(false)} className="p-2 hover:bg-gray-100 rounded-lg transition"><X size={20} /></button>
                        </div>
                        <form onSubmit={salvar} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Título *</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-parish-gold text-sm"
                                    placeholder="Ex: Missa de São Miguel Arcanjo"
                                    value={form.titulo}
                                    onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 flex items-center gap-1"><Calendar size={12}/> Data *</label>
                                    <input
                                        type="date"
                                        required
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-parish-gold text-sm"
                                        value={form.data}
                                        onChange={e => setForm(f => ({ ...f, data: e.target.value }))}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 flex items-center gap-1"><Clock size={12}/> Hora</label>
                                    <input
                                        type="time"
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-parish-gold text-sm"
                                        value={form.hora}
                                        onChange={e => setForm(f => ({ ...f, hora: e.target.value }))}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 flex items-center gap-1"><MapPin size={12}/> Local</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-parish-gold text-sm"
                                    placeholder="Ex: São Miguel Arcanjo, Sagrado Coração..."
                                    value={form.local}
                                    onChange={e => setForm(f => ({ ...f, local: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 flex items-center gap-1"><Tag size={12}/> Tipo / Cor</label>
                                <select
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-parish-gold text-sm bg-white"
                                    value={form.tipo}
                                    onChange={e => setForm(f => ({ ...f, tipo: e.target.value }))}
                                >
                                    {TIPOS.map(t => (
                                        <option key={t.value} value={t.value}>{t.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setModalAberto(false)} className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-50 transition">
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={salvando}
                                    className="flex-1 bg-parish-terracotta hover:bg-red-800 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-md disabled:opacity-50"
                                >
                                    {salvando ? 'Salvando...' : <><CheckCircle size={18}/> {editando ? 'Salvar Alterações' : 'Adicionar Evento'}</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL CONFIRMAÇÃO EXCLUSÃO */}
            {confirmDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setConfirmDelete(null)} />
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center animate-scaleIn">
                        <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertTriangle size={28} className="text-red-500" />
                        </div>
                        <h3 className="text-lg font-serif font-bold text-parish-dark mb-2">Confirmar exclusão</h3>
                        <p className="text-gray-500 text-sm mb-1">Você está prestes a excluir:</p>
                        <p className="font-bold text-parish-dark mb-6 text-sm">"{confirmDelete.titulo}"</p>
                        <div className="flex gap-3">
                            <button onClick={() => setConfirmDelete(null)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl font-bold hover:bg-gray-50 transition text-sm">
                                Cancelar
                            </button>
                            <button onClick={() => handleExcluir(confirmDelete.id)} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl font-bold transition text-sm shadow-md">
                                Sim, excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminAgenda;
