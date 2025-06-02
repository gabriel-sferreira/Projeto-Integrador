import React from 'react';
import { Link } from 'react-router-dom';
import { Timer, Truck, CreditCard, RotateCcw } from 'lucide-react';

const PromoSection: React.FC = () => {
  return (
    <section className="py-12 bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        {/* Main Promo */}
        <div className="bg-blue-700 rounded-xl p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-yellow-400 text-blue-900 font-semibold text-sm rounded-full mb-4">Oferta Limitada</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ganhe 20% OFF em sua primeira compra</h2>
              <p className="text-blue-100 mb-6">Use o cupom <span className="font-mono bg-blue-800 px-2 py-1 rounded">PRIMEIRACOMPRA</span> e aproveite este desconto especial em qualquer produto da loja.</p>
              <div className="flex items-center gap-4">
                <Timer className="text-yellow-300" size={24} />
                <p className="text-yellow-300 font-medium">Oferta válida por tempo limitado</p>
              </div>
              <Link 
                to="/produtos" 
                className="mt-6 inline-block bg-white text-blue-700 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors"
              >
                Comprar Agora
              </Link>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Promoção especial" 
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
        
        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="flex items-start p-4">
            <Truck className="mr-4 text-blue-200 flex-shrink-0" size={32} />
            <div>
              <h3 className="font-semibold text-xl mb-2">Frete Grátis</h3>
              <p className="text-blue-100">Em compras acima de R$ 200 para todo Brasil.</p>
            </div>
          </div>
          
          <div className="flex items-start p-4">
            <CreditCard className="mr-4 text-blue-200 flex-shrink-0" size={32} />
            <div>
              <h3 className="font-semibold text-xl mb-2">Pagamento Seguro</h3>
              <p className="text-blue-100">Diversas formas de pagamento com total segurança.</p>
            </div>
          </div>
          
          <div className="flex items-start p-4">
            <RotateCcw className="mr-4 text-blue-200 flex-shrink-0" size={32} />
            <div>
              <h3 className="font-semibold text-xl mb-2">Devolução Garantida</h3>
              <p className="text-blue-100">Até 30 dias para trocar ou devolver.</p>
            </div>
          </div>
          
          <div className="flex items-start p-4">
            <div className="p-2 rounded-full bg-blue-500 mr-4 flex-shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-200">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2">Produtos de Qualidade</h3>
              <p className="text-blue-100">Curadoria especial com as melhores marcas.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;