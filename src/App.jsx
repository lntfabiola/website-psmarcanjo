import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Componentes
import Navbar from './components/Navbar';
import MobileBottomBar from './components/MobileBottomBar'; 
import Footer from './components/Footer'; 

// Páginas
import Home from './pages/Home';
import Sacramentos from './pages/Sacramentos';
import Contato from './pages/Contato';
import Sobre from './pages/Sobre';
import Admin from './pages/Admin';
import Agenda from './pages/Agenda';
import Dizimo from './pages/Dizimo';
import Comunidades from './pages/Comunidades';
import Pastorais from './pages/Pastorais';
import Oracoes from './pages/Oracoes';
import ShopPage from './pages/ShopPage'; // <--- 1. IMPORTANTE: IMPORTAR A LOJA

// Utilitário para rolar ao topo na troca de rota
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen font-sans selection:bg-parish-gold selection:text-white bg-[#faf7f5] flex flex-col">
        
        {/* Navegação */}
        <Navbar />
        <MobileBottomBar />
        <ScrollToTop /> 

        {/* Rotas - O conteúdo principal */}
        <div className="flex-grow"> 
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* <--- 2. IMPORTANTE: ROTA DA LOJA ADICIONADA */}
            <Route path="/loja" element={<ShopPage />} /> 

            <Route path="/sacramentos" element={<Sacramentos />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/dizimo" element={<Dizimo />} />
            <Route path="/comunidades" element={<Comunidades />} />
            <Route path="/pastorais" element={<Pastorais />} />
            <Route path="/oracoes" element={<Oracoes />} />
          </Routes>
        </div>

        {/* Rodapé - Sempre no final */}
        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;