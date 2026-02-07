import React, { useState, useEffect } from 'react';
import { ShoppingBag, Tag, Phone, Star, X, MessageCircle } from 'lucide-react';

// DADOS COM DESCRIÇÕES DETALHADAS E NOVAS IMAGENS
const productsData = [
  {
    id: 1,
    name: "Camiseta 'Quem como Deus?'",
    price: "45,00",
    category: "Vestuário",
    description: "Camiseta 100% algodão de alta qualidade, na cor branca. Traz a frase 'Quem como Deus?' (Quis ut Deus), o grito de batalha de São Miguel Arcanjo. Disponível nos tamanhos P, M, G e GG. Ideal para vestir sua fé no dia a dia.",
    image: "https://s.storesaint.com.br/product/2024/09/camiseta-quem-como-deus.jpg", 
    tag: "Mais Vendido"
  },
  {
    id: 2,
    name: "Terço de Madeira Imbuia",
    price: "25,00",
    category: "Devocionais",
    description: "Belíssimo terço feito em madeira imbuia autêntica, com cordão resistente e crucifixo detalhado em metal envelhecido. As contas possuem toque suave, ideal para seus momentos de oração e meditação.",
    image: "https://images.tcdn.com.br/img/img_prod/1064297/terco_de_madeira_imbuia_10mm_nossa_senhora_das_gracas_1046_1_015aaf8db7deca4efac62c12e8213c2d.jpg",
  },
  {
    id: 3,
    name: "Bíblia Sagrada Ed. Pastoral",
    price: "60,00",
    category: "Livraria",
    description: "Edição Pastoral da Bíblia Sagrada, com tradução acessível e notas de rodapé explicativas. Capa luxo flexível e encadernação resistente. Indispensável para o estudo da Palavra e acompanhamento da liturgia.",
    image: "https://images.tcdn.com.br/img/img_prod/103175/biblia_sagrada_catolica_pastoral_media_ziper_jeans_paulus_6957_1_7ed1c52e958e9ba316935f7c9cc634f3_20250718100024.jpg",
  },
  {
    id: 4,
    name: "Imagem São Miguel (30cm)",
    price: "120,00",
    category: "Imagens",
    description: "Imagem de São Miguel Arcanjo em resina importada, com 30cm de altura. Pintura feita à mão com detalhes dourados e acabamento impecável. Uma peça de grande devoção para abençoar o seu lar.",
    image: "https://images.tcdn.com.br/img/img_prod/1159537/imagem_anjo_sao_miguel_resina_30cm_importada_31_1_b8c9abfd061f5a64580af36645747632.jpg",
    tag: "Peça Única"
  },
  {
    id: 5,
    name: "Vela Votiva 7 Dias",
    price: "12,00",
    category: "Devocionais",
    description: "Vela votiva de 7 dias (branca), fabricada com parafina pura que garante uma queima limpa e sem cheiro. Embalagem protetora anti-chamas. Ideal para o seu altar doméstico.",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: 6,
    name: "Livro 'O Combate da Oração'",
    price: "35,00",
    category: "Livraria",
    description: "Um guia espiritual profundo sobre como enfrentar as distrações e dificuldades na vida de oração. O autor nos ensina a perseverar na fé através de conselhos práticos e teologia sólida.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600",
  }
];

const categories = ["Todos", "Vestuário", "Devocionais", "Livraria", "Imagens"];

const ShopPage = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado do Modal

  // Filtra produtos
  const filteredProducts = activeCategory === "Todos" 
    ? productsData 
    : productsData.filter(p => p.category === activeCategory);

  // Bloqueia o scroll da página quando o modal está aberto
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProduct]);

 const handleBuyClick = (productName) => {
    const phone = "551150505716";
    
    const message = `Olá! Gostaria de reservar o item: *${productName}* que vi no site.\n\nAinda está disponível? Gostaria de saber mais detalhes sobre o processo de compra. Obrigado!`;
    
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-[#fcfbf9] min-h-screen pt-20 pb-20">
      
      {/* HEADER */}
      <div className="bg-parish-dark text-white py-16 md:py-24 relative overflow-hidden mb-8">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="text-parish-gold uppercase tracking-[0.2em] text-xs font-bold mb-3 block">Loja Paroquial</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Artigos Religiosos</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Adquira produtos que evangelizam. Toda a renda é revertida para as obras da comunidade.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        
        {/* FILTROS */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
           {categories.map(cat => (
             <button
               key={cat}
               onClick={() => setActiveCategory(cat)}
               className={`px-4 py-2 rounded-full text-sm font-bold transition-all
                 ${activeCategory === cat 
                   ? 'bg-parish-terracotta text-white shadow-md' 
                   : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}
             >
               {cat}
             </button>
           ))}
        </div>

        {/* GRID DE PRODUTOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              onClick={() => setSelectedProduct(product)} // ABRE O MODAL
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col h-full"
            >
              <div className="h-64 overflow-hidden relative bg-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                {product.tag && <span className="absolute top-3 left-3 bg-parish-gold text-parish-dark text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-full shadow-sm">{product.tag}</span>}
                
                {/* Overlay "Ver Detalhes" ao passar o mouse */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <span className="bg-white/90 text-gray-800 text-xs font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm">
                     Ver Detalhes
                   </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">{product.category}</p>
                <h3 className="font-serif font-bold text-gray-800 text-lg mb-2 leading-tight">{product.name}</h3>
                <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-xl font-bold text-parish-terracotta">R$ {product.price}</span>
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-parish-gold group-hover:text-parish-dark transition-colors">
                     <ShoppingBag size={14} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* INFO FOOTER */}
        <div className="mt-16 text-center opacity-60">
            <p className="text-sm text-gray-500">Visite nossa loja física após as Santas Missas.</p>
        </div>
      </div>

      {/* --- MODAL DE DETALHES DO PRODUTO --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          
          {/* Fundo Escuro (Backdrop) */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedProduct(null)}
          ></div>

          {/* Card do Modal */}
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl relative z-10 overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[600px] animate-fadeIn">
             
             {/* Botão Fechar (Mobile) */}
             <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-20 bg-white/80 p-2 rounded-full md:hidden text-gray-600 shadow-sm backdrop-blur-md"
             >
                <X size={20} />
             </button>

             {/* Lado Esquerdo: Imagem */}
             <div className="md:w-1/2 h-64 md:h-auto bg-gray-100 relative shrink-0">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover"
                />
                {selectedProduct.tag && (
                  <span className="absolute top-4 left-4 bg-parish-gold text-parish-dark text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {selectedProduct.tag}
                  </span>
                )}
             </div>

             {/* Lado Direito: Informações (Com Scroll se precisar) */}
             <div className="md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto bg-white">
                
                {/* Botão Fechar (Desktop) */}
                <div className="hidden md:flex justify-end mb-2">
                   <button onClick={() => setSelectedProduct(null)} className="text-gray-400 hover:text-gray-800 transition-colors">
                      <X size={24} />
                   </button>
                </div>

                <div className="mb-1">
                   <span className="text-xs font-bold text-parish-terracotta uppercase tracking-widest bg-red-50 px-2 py-1 rounded">
                      {selectedProduct.category}
                   </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-4 mt-3 leading-tight">
                  {selectedProduct.name}
                </h2>

                <div className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                   R$ {selectedProduct.price}
                   <span className="text-xs font-normal text-gray-400 uppercase tracking-wide mt-2">Á vista / Pix</span>
                </div>

                <div className="prose prose-sm text-gray-600 mb-8 leading-relaxed">
                   <p>{selectedProduct.description}</p>
                </div>

                {/* Botão de Ação */}
                <div className="mt-auto pt-6 border-t border-gray-100">
                   <button 
                      onClick={() => handleBuyClick(selectedProduct.name)}
                      className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg shadow-green-600/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                   >
                      <MessageCircle size={20} />
                      Tenho Interesse (WhatsApp)
                   </button>
                   <p className="text-center text-[10px] text-gray-400 mt-3">
                      Ao clicar, você será redirecionado para falar com a secretaria.
                   </p>
                </div>

             </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ShopPage;