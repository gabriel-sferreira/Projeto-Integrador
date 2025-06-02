import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-semibold mb-4">ShopBrasil</h3>
            <p className="text-gray-300 mb-4">
              Sua loja online com os melhores produtos e preços. Entrega para todo o Brasil com rapidez e segurança.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Categorias</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/produtos?categoria=eletronicos" className="text-gray-300 hover:text-white transition-colors">
                  Eletrônicos
                </Link>
              </li>
              <li>
                <Link to="/produtos?categoria=moda" className="text-gray-300 hover:text-white transition-colors">
                  Moda
                </Link>
              </li>
              <li>
                <Link to="/produtos?categoria=casa-decoracao" className="text-gray-300 hover:text-white transition-colors">
                  Casa & Decoração
                </Link>
              </li>
              <li>
                <Link to="/produtos?categoria=esportes" className="text-gray-300 hover:text-white transition-colors">
                  Esportes
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/sobre" className="text-gray-300 hover:text-white transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/politica-de-privacidade" className="text-gray-300 hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/termos-de-uso" className="text-gray-300 hover:text-white transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/perguntas-frequentes" className="text-gray-300 hover:text-white transition-colors">
                  Perguntas Frequentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  Av. 85, 1234 - Setor Bueno<br />
                  Goiânia - GO, 74223-010
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <span className="text-gray-300">(62) 3000-1000</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <a href="mailto:contato@shopbrasil.com" className="text-gray-300 hover:text-white transition-colors">
                  contato@shopbrasil.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ShopBrasil. Todos os direitos reservados.
          </p>
          <div className="flex items-center space-x-4">
            <img src="https://via.placeholder.com/40x25" alt="Visa" className="h-6" />
            <img src="https://via.placeholder.com/40x25" alt="Mastercard" className="h-6" />
            <img src="https://via.placeholder.com/40x25" alt="PayPal" className="h-6" />
            <img src="https://via.placeholder.com/40x25" alt="Pix" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;