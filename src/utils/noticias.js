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

// Imagens enviadas pelo painel ficam na coleção "noticias_imagens" do Firestore
// e são servidas pelo imagem.php da Hostinger, para terem um link normal
// (necessário para a prévia do WhatsApp/Facebook).
export const SITE_URL = 'https://psmarcanjo.com';
export const urlImagem = (id) => `${SITE_URL}/imagem.php?id=${id}`;
export const getImagemId = (url) => url?.match(/\/imagem\.php\?id=([A-Za-z0-9_-]+)/)?.[1] || null;

// O Firestore aceita documentos de até 1 MB; o base64 aumenta ~33% o tamanho
const LIMITE_BASE64 = 850_000;

const carregarImagem = (file) => new Promise((resolve, reject) => {
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
  img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Arquivo de imagem inválido.')); };
  img.src = url;
});

// Reduz a foto (lado maior até 1600px) e converte para JPEG em data URL,
// baixando a qualidade/tamanho até caber no limite do Firestore.
export const comprimirImagem = async (file) => {
  const img = await carregarImagem(file);
  for (const maxLado of [1600, 1200, 900]) {
    const escala = Math.min(1, maxLado / Math.max(img.width, img.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(img.width * escala);
    canvas.height = Math.round(img.height * escala);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff'; // PNG com transparência fica com fundo branco
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    for (const qualidade of [0.85, 0.75, 0.65]) {
      const dataUrl = canvas.toDataURL('image/jpeg', qualidade);
      if (dataUrl.length <= LIMITE_BASE64) return dataUrl;
    }
  }
  throw new Error('Não foi possível reduzir esta imagem. Tente outra foto.');
};

// Tempo estimado de leitura (~200 palavras/min)
export const tempoLeitura = (texto) => {
  if (!texto) return 0;
  const palavras = texto.trim().split(/\s+/).length;
  return Math.max(1, Math.round(palavras / 200));
};
