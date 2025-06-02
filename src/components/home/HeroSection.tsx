import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative h-screen max-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
          alt="Hero background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            As melhores ofertas estão aqui
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Encontre produtos de alta qualidade com os melhores preços. Frete grátis em compras acima de R$ 200.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/produtos" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
            >
              Ver Produtos
              <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link 
              to="/ofertas" 
              className="bg-white hover:bg-gray-100 text-gray-800 px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
            >
              Ofertas Especiais
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;