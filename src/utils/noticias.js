// Utilitários compartilhados entre a página pública de Notícias e o painel admin

export const CATEGORIAS = [
  { value: 'artigo', label: 'Artigo' },
  { value: 'video', label: 'Vídeo' },
  { value: 'noticia', label: 'Notícia' },
];

export const getCategoriaLabel = (value) =>
  CATEGORIAS.find(c => c.value === value)?.label || 'Notícia';

// Aceita links como:
//   https://www.instagram.com/p/ABC123/
//   https://www.instagram.com/reel/ABC123/?igsh=...
//   https://www.instagram.com/paroquia/reel/ABC123/
export const getInstagramEmbedUrl = (url) => {
  if (!url) return null;
  const match = url.match(/instagram\.com\/(?:[^/]+\/)?(p|reel|reels|tv)\/([A-Za-z0-9_-]+)/);
  if (!match) return null;
  const tipo = match[1] === 'reels' ? 'reel' : match[1];
  return `https://www.instagram.com/${tipo}/${match[2]}/embed`;
};

const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

// "2026-10-15" -> "15 de outubro de 2026"
export const formatarDataExtenso = (dataStr) => {
  if (!dataStr) return '';
  const [ano, mes, dia] = dataStr.split('-');
  return `${Number(dia)} de ${MESES[Number(mes) - 1]} de ${ano}`;
};

// Tempo estimado de leitura (~200 palavras/min)
export const tempoLeitura = (texto) => {
  if (!texto) return 0;
  const palavras = texto.trim().split(/\s+/).length;
  return Math.max(1, Math.round(palavras / 200));
};
