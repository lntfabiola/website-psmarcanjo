// Busca da liturgia diária, compartilhada entre a página /liturgia e a home
import { SITE_URL } from './noticias';

// API pública com o Missal completo do dia (aceita qualquer data, CORS liberado)
const API_URL = 'https://liturgia.up.railway.app/v2/';

export const buscarLiturgia = async (data) => {
  const res = await fetch(`${API_URL}?dia=${data.getDate()}&mes=${data.getMonth() + 1}&ano=${data.getFullYear()}`);
  if (!res.ok) throw new Error(`Liturgia: HTTP ${res.status}`);
  const json = await res.json();
  if (!json?.leituras?.evangelho?.length) throw new Error('Liturgia sem evangelho');
  return json;
};

// A API não traz a aclamação ao Evangelho; o aclamacao.php (Hostinger) busca na Canção Nova.
// Se falhar, a página simplesmente não mostra a aclamação.
export const buscarAclamacao = async (data) => {
  try {
    const res = await fetch(`${SITE_URL}/aclamacao.php?data=${paraInput(data)}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json?.refrao ? json : null;
  } catch {
    return null;
  }
};

// Data local "AAAA-MM-DD" (não UTC: depois das 21h no Brasil o UTC já é o dia seguinte)
export const paraInput = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export const dataPorExtenso = (d) => {
  const texto = d.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  return texto.charAt(0).toUpperCase() + texto.slice(1);
};

// Cores litúrgicas: faixa do topo, bolinha e destaque das seções
const CORES = {
  verde: { faixa: 'from-emerald-700 to-green-900', ponto: 'bg-emerald-600', destaque: 'text-emerald-800', claro: 'bg-emerald-50 border-emerald-100', aba: 'bg-emerald-700' },
  branco: { faixa: 'from-[#d8c9a8] to-[#b49a6a]', ponto: 'bg-white border border-stone-300', destaque: 'text-parish-gold', claro: 'bg-amber-50/60 border-amber-100', aba: 'bg-parish-gold' },
  vermelho: { faixa: 'from-red-700 to-red-900', ponto: 'bg-red-600', destaque: 'text-red-800', claro: 'bg-red-50 border-red-100', aba: 'bg-red-700' },
  roxo: { faixa: 'from-purple-700 to-purple-950', ponto: 'bg-purple-700', destaque: 'text-purple-800', claro: 'bg-purple-50 border-purple-100', aba: 'bg-purple-700' },
  rosa: { faixa: 'from-pink-400 to-pink-600', ponto: 'bg-pink-400', destaque: 'text-pink-700', claro: 'bg-pink-50 border-pink-100', aba: 'bg-pink-500' },
  preto: { faixa: 'from-stone-700 to-stone-900', ponto: 'bg-stone-900', destaque: 'text-stone-800', claro: 'bg-stone-100 border-stone-200', aba: 'bg-stone-800' },
};
const COR_PADRAO = { faixa: 'from-parish-brown to-parish-dark', ponto: 'bg-parish-gold', destaque: 'text-parish-terracotta', claro: 'bg-parish-light/50 border-parish-light', aba: 'bg-parish-terracotta' };

export const getCor = (cor) => {
  const c = (cor || '').toLowerCase();
  const chave = Object.keys(CORES).find(k => c.includes(k));
  return CORES[chave] || COR_PADRAO;
};

// Estrofes do salmo vêm separadas por "\n– "
export const estrofesSalmo = (texto) =>
  (texto || '').split('\n').map(s => s.replace(/^[–-]\s*/, '').trim()).filter(Boolean);
