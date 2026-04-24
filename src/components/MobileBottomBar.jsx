import React from 'react';
import { Home, Calendar, Heart, ShoppingBag, Info } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const MobileBottomBar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  // Atualizando os links para englobar as abas principais que estavam faltando
  const items = [
    { icon: <Home size={22} />, label: "Início", path: "/" },
    { icon: <ShoppingBag size={22} />, label: "Lojinha", path: "/loja" },
    { icon: <Heart size={26} />, label: "Dízimo", path: "/dizimo", isSpecial: true },
    { icon: <Calendar size={22} />, label: "Agenda", path: "/agenda" },
    { icon: <Info size={22} />, label: "Sobre", path: "/sobre" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-[60]">

      {/* Sombra suave no topo da barra */}
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>

      <div className="relative bg-white border-t border-gray-200 pb-safe shadow-2xl">
        <div className="flex justify-between items-center h-16 px-4">
          {items.map((item, index) => {

            if (item.isSpecial) {
              return (
                <Link key={index} to={item.path} onClick={() => window.scrollTo(0, 0)} className="relative -top-5">
                  <div className="bg-parish-terracotta text-white p-3.5 rounded-full shadow-lg shadow-parish-terracotta/40 border-[3px] border-[#f4f1ea] transform active:scale-95 transition-transform">
                    {item.icon}
                  </div>
                </Link>
              )
            }

            return (
              <Link
                key={index}
                to={item.path}
                onClick={() => window.scrollTo(0, 0)}
                className={`flex flex-col items-center justify-center w-14 gap-1 ${isActive(item.path) ? 'text-parish-dark font-bold' : 'text-gray-500 font-medium'}`}
              >
                {item.icon}
                <span className={`text-[10px] uppercase tracking-wide ${isActive(item.path) ? 'opacity-100' : 'opacity-80'}`}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
      <div className="h-[env(safe-area-inset-bottom)] bg-white"></div>
    </div>
  );
};

export default MobileBottomBar;