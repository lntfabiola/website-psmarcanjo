import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import logoParoquia from '../assets/images/logo-main.png';
import logoMsc from '../assets/images/logo-msc.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollLink = (e, targetId) => {
    if (!isHome) return;
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
    setActiveDropdown(null);
  };

  const navItems = [
    { name: 'Início', path: '/', isScroll: true, target: '#inicio' },
    {
      name: 'Vida Paroquial',
      isDropdown: true,
      subItems: [
        { name: 'A Paróquia', path: '/sobre' },
        { name: 'Nossas Comunidades', path: '/comunidades' },
        { name: 'As Pastorais', path: '/pastorais' },
        { name: 'Programação / Agenda', path: '/agenda' },
      ]
    },
    {
      name: 'Espiritualidade',
      isDropdown: true,
      subItems: [
        { name: 'Os Sacramentos', path: '/sacramentos' },
        { name: 'Orações', path: '/oracoes' },
      ]
    },
    { name: 'Loja', path: '/loja', isScroll: false },
    { name: 'Dízimo', path: '/dizimo', isScroll: false },
    { name: 'Contato', path: '/contato', isScroll: false },
  ];

  const navBackground = (isHome && !scrolled)
    ? 'bg-gradient-to-b from-black/90 via-black/40 to-transparent py-5'
    : 'bg-parish-dark/95 backdrop-blur-md shadow-md py-3';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${navBackground}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">

          {/* LOGOS */}
          <div className="flex-shrink-0 flex items-center gap-4">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <img
                src={logoParoquia}
                alt="Paróquia São Miguel"
                className={`w-auto object-contain transition-all duration-500 drop-shadow-md cursor-pointer hover:scale-105 ${scrolled ? 'h-10' : 'h-14'}`}
              />
            </Link>
            <div className={`w-[1px] bg-white/20 transition-all duration-500 ${scrolled ? 'h-8' : 'h-10'}`}></div>
            <a href="https://www.msc.com.br/" target="_blank" rel="noopener noreferrer">
              <img
                src={logoMsc}
                alt="MSC"
                className={`w-auto object-contain transition-all duration-500 drop-shadow-md rounded hover:opacity-100 hover:scale-105 cursor-pointer opacity-90 invert ${scrolled ? 'h-8' : 'h-10'}`}
              />
            </a>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => {

              if (item.isDropdown) {
                return (
                  <div
                    key={index}
                    className="relative group px-2"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className="flex items-center gap-1 text-white/90 hover:text-white px-2 py-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors">
                      {item.name}
                      <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180 text-parish-gold' : 'opacity-70'}`} />
                    </button>

                    {/* Menu Dropdown */}
                    <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 transform origin-top
                      ${activeDropdown === item.name ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-95 invisible'}`}
                    >
                      <div className="bg-white rounded-2xl shadow-2xl p-2 w-56 border border-stone-100 relative before:content-[''] before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-b-white">
                        {item.subItems.map((sub, sIdx) => (
                          <Link
                            key={sIdx}
                            to={sub.path}
                            className="block px-4 py-3 text-sm font-sans font-medium text-stone-600 hover:text-parish-dark hover:bg-stone-50 rounded-xl transition-colors"
                            onClick={() => { setActiveDropdown(null); window.scrollTo(0, 0); }}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              const shouldScroll = item.isScroll && isHome;
              return shouldScroll ? (
                <a
                  key={index}
                  href={item.target}
                  onClick={(e) => handleScrollLink(e, item.target)}
                  className="relative text-white/90 hover:text-white px-3 py-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors cursor-pointer group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-parish-gold transition-all duration-300 group-hover:w-1/2"></span>
                </a>
              ) : (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => window.scrollTo(0, 0)}
                  className="relative text-white/90 hover:text-white px-3 py-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-parish-gold transition-all duration-300 group-hover:w-1/2"></span>
                </Link>
              );
            })}
          </div>

          {/* MOBILE TOGGLE */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white hover:text-parish-gold transition-colors focus:outline-none"
            >
              <div className="relative w-7 h-7 flex items-center justify-center">
                {isOpen ? <X size={26} className="absolute animate-spin-fast" /> : <Menu size={28} className="absolute" />}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`lg:hidden absolute w-full top-full left-0 bg-[#16120e] border-t border-white/5 shadow-2xl transition-all duration-500 ease-in-out border-b border-parish-gold/20
        ${isOpen ? 'max-h-[85vh] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        <div className="px-6 py-8 space-y-4 flex flex-col">
          {navItems.map((item, index) => {

            if (item.isDropdown) {
              const isSubOpen = activeDropdown === item.name;
              return (
                <div key={index} className="border-b border-white/10 pb-4">
                  <button
                    onClick={() => setActiveDropdown(isSubOpen ? null : item.name)}
                    className="w-full flex items-center justify-between py-2 text-xl font-serif text-white/90 hover:text-parish-gold transition-colors"
                  >
                    {item.name}
                    <ChevronDown size={20} className={`transition-transform duration-300 ${isSubOpen ? 'rotate-180 text-parish-gold' : 'opacity-50'}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 pl-4 space-y-3 ${isSubOpen ? 'max-h-48 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                    {item.subItems.map((sub, sIdx) => (
                      <Link
                        key={sIdx}
                        to={sub.path}
                        onClick={() => { setIsOpen(false); window.scrollTo(0, 0); }}
                        className="block text-base font-sans text-white/60 hover:text-white transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            const shouldScroll = item.isScroll && isHome;
            const linkClass = "text-xl font-serif text-white/90 hover:text-parish-gold transition-colors block py-3 border-b border-white/10";

            return shouldScroll ? (
              <a
                key={index}
                href={item.target}
                onClick={(e) => { handleScrollLink(e, item.target); setIsOpen(false); }}
                className={linkClass}
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={index}
                to={item.path}
                onClick={() => { setIsOpen(false); window.scrollTo(0, 0); }}
                className={linkClass}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        <div className="pb-8 pt-4 text-center">
          <span className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Paróquia São Miguel Arcanjo</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;