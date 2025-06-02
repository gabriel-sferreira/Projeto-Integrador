import React from 'react';
import HeroSection from '../components/home/HeroSection';
import CategorySection from '../components/home/CategorySection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import PromoSection from '../components/home/PromoSection';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getNewProducts, getSaleProducts } from '../data/products';
import ProductCard from '../components/product/ProductCard';

const HomePage: React.FC = () => {
  const newProducts = getNewProducts().slice(0, 4);
  const saleProducts = getSaleProducts().slice(0, 4);

  return (
    <div className="pt-16"> {/* Add padding top for the fixed header */}
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      
      {/* New Arrivals Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Novidades</h2>
              <p className="text-gray-600">Os produtos mais recentes da nossa loja</p>
            </div>
            <Link 
              to="/produtos?novidades=true" 
              className="hidden md:flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Ver todos
              <ArrowRight size={18} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link 
              to="/produtos?novidades=true" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Ver todas as novidades
              <ArrowRight size={18} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>
      
      <PromoSection />
      
      {/* Sale Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Ofertas</h2>
              <p className="text-gray-600">Produtos com descontos especiais</p>
            </div>
            <Link 
              to="/produtos?promocao=true" 
              className="hidden md:flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Ver todos
              <ArrowRight size={18} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {saleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link 
              to="/produtos?promocao=true" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Ver todas as ofertas
              <ArrowRight size={18} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Fique por dentro das novidades</h2>
            <p className="text-gray-600 mb-6">
              Cadastre-se para receber ofertas exclusivas, lançamentos e promoções especiais.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Inscrever-se
              </button>
            </form>
            <p className="text-gray-500 text-sm mt-4">
              Ao se inscrever, você concorda com nossa Política de Privacidade.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;