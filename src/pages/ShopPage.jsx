import React, { useState, useEffect } from 'react';
import { MessageCircle, X, ShoppingBag, ChevronRight, Image as ImageIcon } from 'lucide-react';

// Importa dinamicamente todas as imagens da pasta Produtos
const images = import.meta.glob('../assets/Produtos/*.{png,jpg,jpeg}', { eager: true, import: 'default' });

// Função auxiliar para resgatar a URL exata da imagem importada
const getImageUrl = (filename) => {
  const path = `../assets/Produtos/${filename}`;
  return images[path] || null;
};

// ─────────────────────────────────────
//  DADOS DOS PRODUTOS
// ─────────────────────────────────────
const produtosTercos = Array.from({ length: 20 }).map((_, i) => ({
  id: `t${i + 1}`,
  name: `Terço Artesanal (${i + 1})`,
  price: 'Sob Consulta',
  description: 'Lindo terço artesanal, ideal para sua devoção diária e também para presentear. Feito com materiais de ótima qualidade.',
  imageFile: `${i + 1}.png`,
  tag: i < 5 ? 'Destaque' : null,
}));

const produtosBiblias = [
  { id: 'b1', name: 'Bíblia Sagrada — Ed. Pastoral', price: 'Sob Consulta', description: 'Edição com tradução acessível, notas de rodapé e capa especial. Indispensável para o estudo da Palavra.', imageFile: '21.png', tag: 'Recomendado' },
  { id: 'b3', name: 'Bíblia Sagrada — Ilustrada', price: 'Sob Consulta', description: 'Com belíssimas ilustrações bíblicas e conteúdo especial. Excelente para catequese e estudos em grupo.', imageFile: '23.png', tag: null },
  { id: 'b4', name: 'Bíblia Sagrada — Formato Médio', price: 'Sob Consulta', description: 'Prática para carregar, possui um bom equilíbrio entre tamanho e facilidade na leitura.', imageFile: '24.png', tag: null },
  { id: 'b5', name: 'Bíblia Sagrada — Edição Compacta', price: 'Sob Consulta', description: 'Tamanho bolso, perfeita para levar aonde você for e rezar com a Palavra do Senhor.', imageFile: '25.png', tag: null },
];

const produtosCrucifixos = [
  { id: 'c1', name: 'Crucifixo de Parede Clássico', price: 'Sob Consulta', description: 'Belo crucifixo de parede para abençoar o seu lar, feito com acabamento cuidadoso e de qualidade.', imageFile: '26.png', tag: 'Mais Vendido' },
  { id: 'c2', name: 'Crucifixo de Mesa', price: 'Sob Consulta', description: 'Ideal para oratórios, cômodas ou mesas de trabalho. Lembre-se do sacrifício de Cristo do seu dia a dia.', imageFile: '27.png', tag: null },
  { id: 'c3', name: 'Crucifixo Detalhado', price: 'Sob Consulta', description: 'Uma peça única e especial com traços mais detalhados e acabamento refinado para as paredes da sua casa.', imageFile: '28.png', tag: null },
];

const nomesImagens = [
  "29 - Santa Edwiges.png",
  "30 - Santa Rita.png",
  "31 - Sagrado.png",
  "32 - N. Sra. do Carmo.png",
  "33 - Desatadora dos nós.png",
  "34 - N. Sra de Lourdes.png",
  "35 - Sagrado Coração de Maria.png",
  "36 - Imaculada Conceição.png",
  "37 - Maria passa na frente.png",
  "38 - N. Sra. Fátima.png",
  "39 - N. Sra. Aparecida.png",
  "40 - São Miguel Arcanjo.png"
];

const produtosImagens = nomesImagens.map((file, i) => {
  // Limpa o nome do arquivo para usar de titulo. Ex: "29 - Santa Edwiges.png" -> "Santa Edwiges"
  let cleanName = file.replace(/^\d+\s*-\s*/, '').replace('.png', '');
  // A capitalização das imagens está razoável, então podemos manter cleanName.
  
  return {
    id: `img${i + 1}`,
    name: cleanName,
    price: 'Sob Consulta',
    description: `Belíssima imagem de ${cleanName}, pintada à mão com acabamento premium e excelente durabilidade para ornamentar o seu oratório.`,
    imageFile: file,
    tag: file.includes("Miguel") ? "Padroeiro" : null,
  };
});

// ─────────────────────────────────────
//  COMPONENTES DE UI DA LOJA
// ─────────────────────────────────────

const ProductCard = ({ product, onClick }) => {
  const imageUrl = getImageUrl(product.imageFile);

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-500 group cursor-pointer flex flex-col border border-stone-100/60"
    >
      <div className="aspect-[4/5] relative bg-stone-50 overflow-hidden flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center opacity-30 text-stone-400">
            <ImageIcon size={40} className="mb-2" />
            <span className="text-xs uppercase tracking-widest font-bold">Sem imagem</span>
          </div>
        )}
        
        {/* Gradiente sobre a imagem no hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {product.tag && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-stone-800 text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-full shadow-sm">
            {product.tag}
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow bg-white">
        <h3 className="font-serif text-lg text-stone-800 leading-tight mb-2 flex-grow transition-colors group-hover:text-parish-terracotta">{product.name}</h3>
        <div className="flex justify-between items-center pt-4 border-t border-stone-100/80 mt-1">
          <span className="text-[13px] uppercase tracking-widest font-bold text-stone-500">{product.price}</span>
          <div className="w-8 h-8 rounded-full bg-stone-50 group-hover:bg-parish-terracotta group-hover:text-white transition-colors duration-300 flex items-center justify-center text-stone-400">
            <ShoppingBag size={14} />
          </div>
        </div>
      </div>
    </div>
  );
};

const SectionHeader = ({ id, badge, title, subtitle }) => (
  <div id={id} className="mb-10 text-center max-w-2xl mx-auto">
    <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-parish-terracotta mb-2 bg-parish-terracotta/5 px-4 py-1.5 rounded-full border border-parish-terracotta/10">
      {badge}
    </span>
    <h2 className="text-3xl md:text-4xl font-serif text-stone-800">{title}</h2>
    {subtitle && <p className="text-sm md:text-base text-stone-500 mt-3">{subtitle}</p>}
  </div>
);

// ─────────────────────────────────────
//  MODAL DE PRODUTO
// ─────────────────────────────────────
const Modal = ({ product, onClose, onOrder }) => {
  if (!product) return null;
  const imageUrl = getImageUrl(product.imageFile);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 pb-20" style={{ overscrollBehavior: 'contain' }}>
      <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl relative z-10 overflow-hidden animate-slideUpFade flex flex-col md:flex-row max-h-[85vh] md:max-h-[90vh]">
        
        {/* Área da Imagem */}
        <div className="w-full md:w-1/2 bg-stone-50 relative shrink-0 h-[280px] sm:h-[400px] md:h-auto md:min-h-[500px]">
          {imageUrl ? (
            <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-stone-400 opacity-50">
              <ImageIcon size={64} />
            </div>
          )}
          {product.tag && (
            <span className="absolute top-5 left-5 bg-white/95 text-stone-800 text-xs font-bold px-4 py-1.5 rounded-full shadow-md backdrop-blur-md">
              {product.tag}
            </span>
          )}
          <button onClick={onClose} className="absolute top-5 right-5 bg-white/95 p-2 rounded-full text-stone-600 shadow-md backdrop-blur-md hover:bg-stone-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Área de Detalhes */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
          <p className="text-[11px] font-bold text-parish-terracotta uppercase tracking-[0.2em] mb-2">{product.categoria}</p>
          <h2 className="text-3xl font-serif text-stone-800 mb-4">{product.name}</h2>
          <p className="text-2xl font-light text-stone-600 mb-6 border-b border-stone-100 pb-6">{product.price}</p>
          
          <div className="mb-6 md:mb-8">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Descrição</h4>
            <p className="text-stone-600 leading-relaxed text-xs md:text-base">{product.description}</p>
          </div>

          <div className="bg-green-50/50 border border-green-100 rounded-xl md:rounded-2xl p-3 md:p-4 mb-6 md:mb-8 text-xs md:text-sm text-green-800">
            <b className="block mb-1 text-green-900">Encomendas por WhatsApp</b>
            Gostou deste item? Clique abaixo para encomendar e combinar a retirada na secretaria da paróquia.
          </div>

          <button
            onClick={() => onOrder(product.name)}
            className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(22,163,74,0.4)] text-sm md:text-base"
          >
            <MessageCircle size={20} />
            Fazer Encomenda
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────
//  COMPONENTE PRINCIPAL
// ─────────────────────────────────────
const ShopPage = () => {
  const [modal, setModal] = useState(null);

  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [modal]);

  const handleOrder = (name) => {
    const phone = '5511150505716';
    const msg = `Olá! Gostaria de encomendar o item: *${name}* que vi no site da Paróquia São Miguel.\n\nAinda está disponível? Podem me passar mais detalhes? Obrigado!`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const openModal = (product, cat) => setModal({ ...product, categoria: cat });

  // "Âncoras" do menu rápido
  const ancoras = [
    { label: 'Terços', id: 'tercos' },
    { label: 'Bíblias', id: 'biblias' },
    { label: 'Crucifixos', id: 'crucifixos' },
    { label: 'Imagens', id: 'imagens' },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-[#faf8f5] min-h-screen pt-20 pb-24 font-sans text-stone-800">

      {/* ── HERO DA LOJA ── */}
      <div className="bg-stone-900 text-white py-20 md:py-28 relative overflow-hidden mb-8">
        <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10 flex flex-col items-center">
          <span className="text-parish-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">Catálogo Paroquial</span>
          <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
            Artigos Religiosos
          </h1>
          <p className="text-stone-400 text-lg md:text-xl font-light mb-8 max-w-2xl text-center">
            Adquira produtos que evangelizam e fortalecem sua fé. Toda a renda auxilia na manutenção da paróquia.
          </p>
          <a href="https://wa.me/5511150505716" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all">
            <MessageCircle size={16} />
            Dúvidas? (11) 5050-5716
          </a>
        </div>
      </div>

      {/* ── MENU DE NAVEGAÇÃO RÁPIDA ── */}
      <div className="sticky top-[60px] md:top-[64px] z-30 bg-white/80 backdrop-blur-xl border-b border-stone-200/50 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide justify-start md:justify-center">
            {ancoras.map(a => (
              <button
                key={a.id}
                onClick={() => scrollTo(a.id)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-stone-500 hover:bg-stone-900 hover:text-white transition-all whitespace-nowrap shrink-0"
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-16 space-y-28">

        {/* ══════ SEÇÃO 1: TERÇOS ══════ */}
        <section className="scroll-mt-32" id="tercos">
          <SectionHeader
            badge="Catálogo"
            title="Série de Terços"
            subtitle="Explore nossa coleção de terços artesanais e devocionais. Perfeitos para rezar e presentear quem você ama."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
            {produtosTercos.map(m => (
              <ProductCard
                key={m.id}
                product={m}
                onClick={() => openModal(m, 'Terços')}
              />
            ))}
          </div>
        </section>

        <div className="w-full h-px bg-stone-200/50 max-w-4xl mx-auto"></div>

        {/* ══════ SEÇÃO 2: BÍBLIAS ══════ */}
        <section className="scroll-mt-32" id="biblias">
          <SectionHeader
            badge="Estudo e Oração"
            title="Bíblias Sagradas"
            subtitle="Encontre a edição ideal da Sagrada Escritura para o seu momento de vida e estudo litúrgico."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {produtosBiblias.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onClick={() => openModal(p, 'Bíblias')}
              />
            ))}
          </div>
        </section>

        <div className="w-full h-px bg-stone-200/50 max-w-4xl mx-auto"></div>

        {/* ══════ SEÇÃO 3: CRUCIFIXOS ══════ */}
        <section className="scroll-mt-32" id="crucifixos">
          <SectionHeader
            badge="Devoção"
            title="Crucifixos"
            subtitle="Sinal da eterna aliança de amor de Cristo conosco. Para abençoar lares e quartos."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {produtosCrucifixos.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onClick={() => openModal(p, 'Crucifixos')}
              />
            ))}
          </div>
        </section>

        <div className="w-full h-px bg-stone-200/50 max-w-4xl mx-auto"></div>

        {/* ══════ SEÇÃO 4: IMAGENS ══════ */}
        <section className="scroll-mt-32" id="imagens">
          <SectionHeader
            badge="Santos e Santas"
            title="Imagens Sacras"
            subtitle="Riquíssimas imagens em resina, detalhadas e abençoadas para os momentos de intercessão."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {produtosImagens.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onClick={() => openModal(p, 'Imagens')}
              />
            ))}
          </div>
        </section>

        {/* ── RODAPÉ INFORMATIVO DA LOJA ── */}
        <div className="bg-stone-900 rounded-[2rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -ml-20 -mt-20"></div>
          <div className="relative z-10">
            <MessageCircle size={36} className="text-green-500 mx-auto mb-6" />
            <h3 className="font-serif text-2xl md:text-3xl mb-4">Como encomendar?</h3>
            <p className="text-stone-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Toda a vitrine online funciona sob encomenda. Clique no botão de WhatsApp do produto desejado e fale diretamente com a secretaria para mais informações sobre os valores, formas de pagamento e para agendar sua retirada.
            </p>
            <a
              href="https://wa.me/5511150505716?text=Olá! Estava navegando na loja paroquial e gostaria de fazer uma encomenda."
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-[0_10px_30px_-5px_rgba(22,163,74,0.4)]"
            >
              <MessageCircle size={20} />
              Iniciar Atendimento
            </a>
          </div>
        </div>
      </div>

      {/* ── MODAL DE DETALHES ── */}
      <Modal product={modal} onClose={() => setModal(null)} onOrder={handleOrder} />

    </div>
  );
};

export default ShopPage;