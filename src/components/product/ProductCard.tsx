import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  // Format price to BRL
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex gap-2">
        {product.new && (
          <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Novo
          </span>
        )}
        {product.sale && (
          <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Oferta
          </span>
        )}
      </div>
      
      {/* Product Image */}
      <Link to={`/produto/${product.id}`} className="block">
        <div className="h-48 overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
      
      {/* Product Info */}
      <div className="p-4">
        <Link to={`/produto/${product.id}`} className="block">
          <h3 className="text-gray-800 font-medium text-lg mb-1 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">
          {product.shortDescription}
        </p>
        
        <div className="flex items-center justify-between">
          <div>
            {product.oldPrice ? (
              <>
                <span className="text-gray-400 line-through text-sm mr-2">
                  {formatPrice(product.oldPrice)}
                </span>
                <span className="text-red-600 font-semibold">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-gray-800 font-semibold">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
            aria-label="Adicionar ao carrinho"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;