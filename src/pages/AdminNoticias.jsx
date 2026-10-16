import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import {
    Lock, LogIn, LogOut, Plus, Pencil, Trash2, X, CheckCircle, AlertTriangle,
    Newspaper, RefreshCw, Star, EyeOff, Instagram, ExternalLink, ImagePlus, Link2
} from 'lucide-react';
import { CATEGORIAS, getCategoriaLabel, getInstagramEmbedUrl, comprimirImagem, urlImagem, getImagemId } from '../utils/noticias';

const SENHA_ADMIN = "Psma57**";

const hoje = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const itemVazio = () => ({
    categoria: 'artigo', titulo: '', resumo: '', autor: '', data: hoje(),
    instagramUrl: '', capa: '', conteudo: '', destaque: false, publicado: true,
});

const inputClass = "w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-parish-gold text-sm";
const labelClass = "block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5";

const AdminNoticias = () => {
    const [senha, setSenha] = useState('');
    const [logado, setLogado] = useState(false);
    const [loginErro, setLoginErro] = useState(false);
    const [loading, setLoading] = useState(false);
    const [salvando, setSalvando] = useState(false);
    const [itens, setItens] = useState([]);
    const [erro, setErro] = useState('');

    const [modalAberto, setModalAberto] = useState(false);
    const [editando, setEditando] = useState(null);
    const [form, setForm] = useState(itemVazio);
    const [confirmDelete, setConfirmDelete] = useState(null);

    // Capa enviada do computador: fica só no navegador até clicar em Salvar
    const [novaImagem, setNovaImagem] = useState(null);
    const [processandoImagem, setProcessandoImagem] = useState(false);
    const [capaOriginal, setCapaOriginal] = useState('');
    const [mostrarLinkCapa, setMostrarLinkCapa] = useState(false);

    const carregar = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, 'noticias'), orderBy('data', 'desc'));
            const snapshot = await getDocs(q);
            setItens(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
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
            carregar();
        } else {
            setLoginErro(true);
            setSenha('');
        }
    };

    const abrirNovo = (categoria = 'artigo') => {
        setEditando(null);
        setForm({ ...itemVazio(), categoria });
        setNovaImagem(null);
        setCapaOriginal('');
        setMostrarLinkCapa(false);
        setErro('');
        setModalAberto(true);
    };

    const abrirEditar = (item) => {
        setEditando(item.id);
        setForm({ ...itemVazio(), ...item });
        setNovaImagem(null);
        setCapaOriginal(item.capa || '');
        setMostrarLinkCapa(!!item.capa && !getImagemId(item.capa));
        setErro('');
        setModalAberto(true);
    };

    const set = (campo) => (e) => {
        const valor = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setForm(f => ({ ...f, [campo]: valor }));
    };

    const escolherImagem = async (e) => {
        const arquivo = e.target.files?.[0];
        e.target.value = '';
        if (!arquivo) return;
        if (!arquivo.type.startsWith('image/')) {
            setErro('Escolha um arquivo de imagem (JPG, PNG ou WEBP).');
            return;
        }
        setErro('');
        setProcessandoImagem(true);
        try {
            setNovaImagem(await comprimirImagem(arquivo));
        } catch (err) {
            setErro(err.message);
        }
        setProcessandoImagem(false);
    };

    const removerCapa = () => {
        setNovaImagem(null);
        setForm(f => ({ ...f, capa: '' }));
    };

    // Apaga a imagem antiga do Firestore (sem travar o salvamento se falhar)
    const apagarImagem = async (capa) => {
        const id = getImagemId(capa);
        if (!id) return;
        try {
            await deleteDoc(doc(db, 'noticias_imagens', id));
        } catch (err) {
            console.error('Erro ao apagar imagem antiga:', err);
        }
    };

    const salvar = async (e) => {
        e.preventDefault();
        if (form.categoria === 'video' && !getInstagramEmbedUrl(form.instagramUrl)) {
            setErro('Cole um link válido de post ou reel do Instagram.');
            return;
        }
        if (form.categoria !== 'video' && !form.conteudo.trim()) {
            setErro('O texto da publicação é obrigatório.');
            return;
        }
        setSalvando(true);
        try {
            let capa = form.capa.trim();
            if (novaImagem) {
                const imgRef = await addDoc(collection(db, 'noticias_imagens'), {
                    dados: novaImagem,
                    criadoEm: new Date().toISOString(),
                });
                capa = urlImagem(imgRef.id);
            }
            const payload = {
                categoria: form.categoria,
                titulo: form.titulo.trim(),
                resumo: form.resumo.trim(),
                autor: form.autor.trim(),
                data: form.data,
                instagramUrl: form.instagramUrl.trim(),
                capa,
                conteudo: form.conteudo.trim(),
                destaque: form.destaque,
                publicado: form.publicado,
            };
            if (editando) {
                await updateDoc(doc(db, 'noticias', editando), payload);
            } else {
                await addDoc(collection(db, 'noticias'), payload);
            }
            if (capaOriginal && capaOriginal !== capa) await apagarImagem(capaOriginal);
            setModalAberto(false);
            await carregar();
        } catch (err) {
            console.error('Erro ao salvar:', err);
            setErro('Não foi possível salvar. Verifique a conexão e tente novamente.');
        }
        setSalvando(false);
    };

    const handleExcluir = async (item) => {
        try {
            await deleteDoc(doc(db, 'noticias', item.id));
            await apagarImagem(item.capa);
            setConfirmDelete(null);
            await carregar();
        } catch (err) {
            console.error('Erro ao excluir:', err);
        }
    };

    const formatarData = (dataStr) => {
        if (!dataStr) return '';
        const [ano, mes, dia] = dataStr.split('-');
        return `${dia}/${mes}/${ano}`;
    };

    const instagramValido = !!getInstagramEmbedUrl(form.instagramUrl);
    const isVideo = form.categoria === 'video';

    // --- TELA DE LOGIN ---
    if (!logado) {
        return (
            <div className="min-h-screen bg-parish-dark flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-sm w-full text-center">
                    <div className="w-16 h-16 bg-parish-light rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock size={30} className="text-parish-brown" />
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-gray-800 mb-1">Administração</h2>
                    <p className="text-gray-500 text-sm mb-6">Gerenciar Notícias e Artigos</p>

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
        <div className="min-h-screen bg-gray-50 pt-28 pb-24">
            <div className="max-w-6xl mx-auto px-4">

                {/* Cabeçalho */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <span className="text-xs uppercase tracking-widest font-bold text-parish-terracotta">Painel Administrativo</span>
                        <h1 className="text-3xl font-serif font-bold text-parish-dark flex items-center gap-3 mt-1">
                            <Newspaper className="text-parish-gold" /> Notícias e Artigos
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">{itens.length} publicação(ões) no banco de dados</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <button onClick={carregar} title="Atualizar" className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-100 transition">
                            <RefreshCw size={18} />
                        </button>
                        <button
                            onClick={() => abrirNovo('video')}
                            className="flex items-center gap-2 bg-white border border-parish-terracotta text-parish-terracotta hover:bg-red-50 font-bold px-4 py-2.5 rounded-xl transition-all"
                        >
                            <Instagram size={18} /> Novo Vídeo
                        </button>
                        <button
                            onClick={() => abrirNovo('artigo')}
                            className="flex items-center gap-2 bg-parish-terracotta hover:bg-red-800 text-white font-bold px-5 py-2.5 rounded-xl transition-all shadow-md"
                        >
                            <Plus size={20} /> Nova Publicação
                        </button>
                        <button onClick={() => setLogado(false)} title="Sair" className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-500 transition">
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>

                {/* Lista */}
                {loading ? (
                    <div className="text-center py-20 text-gray-400">Carregando...</div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        {itens.length === 0 ? (
                            <div className="text-center py-20 text-gray-400">
                                <Newspaper size={40} className="mx-auto mb-3 opacity-40" />
                                <p>Nenhuma publicação ainda. Clique em "Nova Publicação" para começar.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {itens.map(item => (
                                    <div key={item.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors group">
                                        <span className="text-[10px] font-bold uppercase tracking-wide bg-parish-light text-parish-brown px-2 py-1 rounded-md shrink-0 w-16 text-center">
                                            {getCategoriaLabel(item.categoria)}
                                        </span>
                                        <span className="text-sm font-bold text-parish-dark font-mono shrink-0 hidden sm:block">{formatarData(item.data)}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-parish-dark text-sm truncate flex items-center gap-2">
                                                {item.destaque && <Star size={13} className="text-parish-gold fill-parish-gold shrink-0" />}
                                                {item.titulo}
                                            </p>
                                            <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
                                                {item.autor && <span>{item.autor}</span>}
                                                {item.publicado === false && (
                                                    <span className="flex items-center gap-1 text-orange-500 font-bold"><EyeOff size={11} /> Rascunho</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                            {item.publicado !== false && (
                                                <Link
                                                    to={`/noticias/${item.id}`}
                                                    target="_blank"
                                                    className="p-2 bg-gray-50 text-gray-500 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
                                                    title="Ver no site"
                                                >
                                                    <ExternalLink size={15} />
                                                </Link>
                                            )}
                                            <button
                                                onClick={() => abrirEditar(item)}
                                                className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                                                title="Editar"
                                            >
                                                <Pencil size={15} />
                                            </button>
                                            <button
                                                onClick={() => setConfirmDelete(item)}
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
                <div className="fixed inset-0 z-[70] flex items-start md:items-center justify-center p-4 overflow-y-auto">
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModalAberto(false)} />
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 animate-scaleIn">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h2 className="text-xl font-serif font-bold text-parish-dark">
                                {editando ? 'Editar Publicação' : 'Nova Publicação'}
                            </h2>
                            <button onClick={() => setModalAberto(false)} className="p-2 hover:bg-gray-100 rounded-lg transition"><X size={20} /></button>
                        </div>
                        <form onSubmit={salvar} className="p-6 space-y-5">

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Tipo *</label>
                                    <select className={`${inputClass} bg-white`} value={form.categoria} onChange={set('categoria')}>
                                        {CATEGORIAS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass}>Data *</label>
                                    <input type="date" required className={inputClass} value={form.data} onChange={set('data')} />
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>Título *</label>
                                <input
                                    type="text" required className={inputClass}
                                    placeholder={isVideo ? 'Ex: 20 anos – Depoimento da comunidade' : 'Ex: O sentido da esperança cristã'}
                                    value={form.titulo} onChange={set('titulo')}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Resumo</label>
                                <textarea
                                    rows={2} className={inputClass}
                                    placeholder="Uma ou duas frases que aparecem no card da listagem."
                                    value={form.resumo} onChange={set('resumo')}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Autor</label>
                                <input
                                    type="text" className={inputClass}
                                    placeholder="Ex: Pe. Fulano de Tal, MSC"
                                    value={form.autor} onChange={set('autor')}
                                />
                            </div>

                            <div>
                                <label className={`${labelClass} flex items-center gap-1`}>
                                    <Instagram size={12} /> Link do Instagram {isVideo && '*'}
                                </label>
                                <input
                                    type="url" className={inputClass}
                                    placeholder="https://www.instagram.com/reel/..."
                                    value={form.instagramUrl} onChange={set('instagramUrl')}
                                />
                                {form.instagramUrl && (
                                    <p className={`text-xs mt-1.5 font-bold ${instagramValido ? 'text-green-600' : 'text-red-500'}`}>
                                        {instagramValido ? '✓ Link reconhecido, o vídeo será exibido na página.' : '✗ Link não reconhecido. Use o link de um post ou reel.'}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className={labelClass}>Imagem de capa</label>
                                {(novaImagem || form.capa) ? (
                                    <div className="flex items-center gap-4 p-3 border border-gray-200 rounded-xl">
                                        <img
                                            src={novaImagem || form.capa}
                                            alt="Prévia da capa"
                                            className="w-32 h-20 object-cover rounded-lg bg-gray-100 shrink-0"
                                        />
                                        <div className="flex flex-col gap-2 text-sm">
                                            {novaImagem && <span className="text-xs text-green-600 font-bold">✓ Nova imagem. Será enviada ao salvar.</span>}
                                            <div className="flex flex-wrap gap-2">
                                                <label className="cursor-pointer px-3 py-1.5 border border-gray-300 rounded-lg font-bold text-gray-600 hover:bg-gray-50 transition">
                                                    Trocar
                                                    <input type="file" accept="image/*" className="hidden" onChange={escolherImagem} />
                                                </label>
                                                <button type="button" onClick={removerCapa} className="px-3 py-1.5 border border-red-200 text-red-500 rounded-lg font-bold hover:bg-red-50 transition">
                                                    Remover
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <label className={`flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-parish-gold hover:text-parish-brown transition ${processandoImagem ? 'opacity-60 pointer-events-none' : 'cursor-pointer'}`}>
                                        <ImagePlus size={28} />
                                        <span className="text-sm font-bold">{processandoImagem ? 'Preparando imagem...' : 'Enviar imagem do computador ou celular'}</span>
                                        <span className="text-xs text-gray-400">JPG, PNG ou WEBP. A foto é reduzida automaticamente.</span>
                                        <input type="file" accept="image/*" className="hidden" onChange={escolherImagem} disabled={processandoImagem} />
                                    </label>
                                )}

                                {!novaImagem && (
                                    mostrarLinkCapa ? (
                                        <input
                                            type="url" className={`${inputClass} mt-2`}
                                            placeholder="https://... link de uma imagem"
                                            value={form.capa} onChange={set('capa')}
                                        />
                                    ) : (
                                        <button type="button" onClick={() => setMostrarLinkCapa(true)} className="mt-2 text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1">
                                            <Link2 size={12} /> ou colar o link de uma imagem
                                        </button>
                                    )
                                )}
                                {isVideo && (
                                    <p className="text-xs text-gray-400 mt-1.5">Opcional nos vídeos: aparece no card e na prévia do WhatsApp.</p>
                                )}
                            </div>

                            <div>
                                <label className={labelClass}>Texto {!isVideo && '*'}</label>
                                <textarea
                                    rows={isVideo ? 4 : 14}
                                    className={`${inputClass} font-serif text-base leading-relaxed`}
                                    placeholder={isVideo ? 'Descrição opcional do vídeo.' : 'Cole aqui o texto do artigo.'}
                                    value={form.conteudo} onChange={set('conteudo')}
                                />
                                <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                                    Deixe uma linha em branco entre parágrafos. Use <code className="bg-gray-100 px-1 rounded">## </code> no início da linha para subtítulo,
                                    {' '}<code className="bg-gray-100 px-1 rounded">&gt; </code> para citação, <code className="bg-gray-100 px-1 rounded">**negrito**</code> e <code className="bg-gray-100 px-1 rounded">*itálico*</code>.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-6 pt-1">
                                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 accent-parish-terracotta" checked={form.publicado} onChange={set('publicado')} />
                                    Publicado (desmarque para salvar como rascunho)
                                </label>
                                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 accent-parish-gold" checked={form.destaque} onChange={set('destaque')} />
                                    <Star size={14} className="text-parish-gold" /> Destaque no topo da página
                                </label>
                            </div>

                            {erro && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-sm">
                                    <AlertTriangle size={16} /> {erro}
                                </div>
                            )}

                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setModalAberto(false)} className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-50 transition">
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={salvando || processandoImagem}
                                    className="flex-1 bg-parish-terracotta hover:bg-red-800 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-md disabled:opacity-50"
                                >
                                    {salvando ? 'Salvando...' : <><CheckCircle size={18} /> {editando ? 'Salvar Alterações' : 'Publicar'}</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL CONFIRMAÇÃO EXCLUSÃO */}
            {confirmDelete && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
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
                            <button onClick={() => handleExcluir(confirmDelete)} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl font-bold transition text-sm shadow-md">
                                Sim, excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminNoticias;
