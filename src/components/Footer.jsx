import React from 'react';
import { Facebook, Instagram, MapPin, Phone, Mail, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-parish-dark text-gray-300 pt-16 pb-28 md:pb-10 border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-white tracking-wide">
              Paróquia <br/> <span className="text-parish-gold">São Miguel Arcanjo</span>
            </h3>
            <p className="text-sm leading-relaxed opacity-80 max-w-xs">
              "Defendei-nos no combate". 
              <br /> Região Episcopal Belém,
              <br />Arquidiocese de São Paulo.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://www.instagram.com/paroquiasaomigueljc/" target="_blank" className="p-2 bg-white/5 rounded-full hover:bg-pink-600 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="https://www.facebook.com/pasmarc06/" target="_blank" className="p-2 bg-white/5 rounded-full hover:bg-blue-600 hover:text-white transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6 border-b border-white/10 pb-2 inline-block">Navegação</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" onClick={scrollToTop} className="hover:text-parish-gold">Início</Link></li>
              <li><Link to="/comunidades" onClick={scrollToTop} className="hover:text-parish-gold">Comunidades</Link></li>
              <li><Link to="/pastorais" onClick={scrollToTop} className="hover:text-parish-gold">Pastorais</Link></li>
              <li><Link to="/agenda" onClick={scrollToTop} className="hover:text-parish-gold">Agenda & Horários</Link></li>
              <li><Link to="/sacramentos" onClick={scrollToTop} className="hover:text-parish-gold">Sacramentos</Link></li>
              <li><Link to="/dizimo" onClick={scrollToTop} className="hover:text-parish-gold">Doação (Dízimo)</Link></li>
              <li><Link to="/contato" onClick={scrollToTop} className="hover:text-parish-gold">Fale Conosco</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6 border-b border-white/10 pb-2 inline-block">Contato</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="text-parish-gold mt-1 shrink-0" size={18} />
                <p>Travessa Pé de Manacá, 57 <br/> Jardim da Conquista <br/> SP, 08345-200</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-parish-gold shrink-0" size={18} />
                <p>(11) 5050-5716 (Fixo e WhatsApp)</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-parish-gold shrink-0" size={18} />
                <p>psma7@hotmail.com</p>
              </div>
              <div className="pt-2 text-xs text-white/50">
                 <p>CNPJ: 63.089.825/0502-49
                  <br /> Mitra Arquidiocesana de Sao Paulo</p> {/* Substitua pelo real depois se quiser */}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs opacity-60">
          <p>&copy; 2026 Paróquia São Miguel Arcanjo. Todos os direitos reservados.</p>
          <button onClick={scrollToTop} className="flex items-center gap-1 hover:text-white mt-4 md:mt-0">Voltar ao Topo <ArrowUp size={14}/></button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;