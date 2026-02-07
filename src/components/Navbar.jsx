import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

// IMPORTAR AS DUAS LOGOS
import logoParoquia from '../assets/images/logo-main.png'; 
import logoMsc from '../assets/images/logo-msc.png'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Verifica se está na página inicial para lógica de scroll
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollLink = (e, targetId) => {
    if (!isHome) return; // Se não for home, deixa o Link normal agir
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const links = [
    { name: 'Início', path: '/', isScroll: true, target: '#inicio' },
    { name: 'A Paróquia', path: '/sobre', isScroll: false },
    // Adicione a Loja aqui:
    { name: 'Loja', path: '/loja', isScroll: false }, 
    { name: 'Sacramentos', path: '/sacramentos', isScroll: false },
    { name: 'Agenda', path: '/agenda', isScroll: false },
    { name: 'Doação', path: '/dizimo', isScroll: false },
    { name: 'Contato', path: '/contato', isScroll: false },
  ];

  // Define a cor do fundo baseada no scroll e na página
  const navBackground = (isHome && !scrolled) 
    ? 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-6' // Transparente no topo da home
    : 'bg-parish-dark/95 backdrop-blur-md shadow-md py-3'; // Sólido ao rolar ou em outras páginas

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${navBackground}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* --- ÁREA DAS LOGOS (Separadas agora) --- */}
          <div className="flex-shrink-0 flex items-center gap-3 sm:gap-4">
             
             {/* 1. Logo Paróquia (Link Interno - Home) */}
             <Link 
               to="/" 
               onClick={() => window.scrollTo(0,0)}
               className="cursor-pointer block"
             >
               <img 
                 src={logoParoquia} 
                 alt="Paróquia São Miguel" 
                 className={`w-auto object-contain transition-all duration-500 filter drop-shadow-lg
                   ${scrolled ? 'h-10 md:h-12' : 'h-14 md:h-16'}
                 `}
               /> 
             </Link>

             {/* LINHA DIVISÓRIA */}
             <div className={`w-[1px] bg-white/20 transition-all duration-500 ${scrolled ? 'h-8' : 'h-10'}`}></div>

             {/* 2. Logo MSC (Link Externo) */}
             <a 
               href="https://www.msc.com.br/"  // <--- LINK DO SITE MSC AQUI
               target="_blank" 
               rel="noopener noreferrer"
               className="cursor-pointer group block"
               title="Visitar site MSC"
             >
               <img 
                 src={logoMsc} 
                 alt="MSC" 
                 className={`w-auto object-contain transition-all duration-500 filter drop-shadow-md rounded-md opacity-90 group-hover:opacity-100 group-hover:scale-105
                   ${scrolled ? 'h-8 md:h-10' : 'h-10 md:h-12'}
                 `}
               />
             </a>

          </div>

          {/* MENU DESKTOP */}
          <div className="hidden md:flex space-x-5 lg:space-x-8">
            {links.map((link) => {
              // Verifica se deve rolar (scroll) ou navegar (router)
              const shouldScroll = link.isScroll && isHome;

              return shouldScroll ? (
                // Botão de âncora (scroll na mesma página)
                <a 
                  key={link.name} 
                  href={link.target}
                  onClick={(e) => handleScrollLink(e, link.target)}
                  className="relative text-white/80 hover:text-white px-1 py-2 text-[11px] lg:text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-parish-gold transition-all duration-300 group-hover:w-full"></span>
                </a>
              ) : (
                // Link do Router (muda de página)
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => window.scrollTo(0,0)}
                  className="relative text-white/80 hover:text-white px-1 py-2 text-[11px] lg:text-xs font-bold uppercase tracking-widest transition-colors group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-parish-gold transition-all duration-300 group-hover:w-full"></span>
                </Link>
              );
            })}
          </div>

          {/* MENU MOBILE (HAMBURGUER) */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 text-white hover:text-parish-gold transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* DROPDOWN MOBILE */}
      {isOpen && (
        <div className="md:hidden bg-[#1a1510] border-t border-white/10 absolute w-full top-full left-0 shadow-2xl h-screen animate-slideDown">
          <div className="px-6 py-8 space-y-6 flex flex-col items-center">
            {links.map((link) => {
               const shouldScroll = link.isScroll && isHome;
               const ClassStyle = "text-lg font-serif text-white/90 hover:text-parish-gold transition-colors block py-2";

               return shouldScroll ? (
                <a
                  key={link.name}
                  href={link.target}
                  onClick={(e) => { handleScrollLink(e, link.target); setIsOpen(false); }}
                  className={ClassStyle}
                >
                  {link.name}
                </a>
               ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => { setIsOpen(false); window.scrollTo(0,0); }}
                  className={ClassStyle}
                >
                  {link.name}
                </Link>
               );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;