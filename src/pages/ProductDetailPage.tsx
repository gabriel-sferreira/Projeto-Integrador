import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, ArrowLeft, ArrowRight, Star, Truck } from 'lucide-react';
import { getProductById, getProductsByCategory } from '../data/products';
import { useCart } from '../contexts/CartContext';
import ProductCard from '../components/product/ProductCard';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(parseInt(id || '0'));
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    // Reset state when product changes
    setQuantity(1);
    setActiveImageIndex(0);
    
    // Get related products from the same category
    if (product) {
      const related = getProductsByCategory(product.category)
        .filter(p => p.id !== product.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
    
    // Scroll to top when product changes
    window.scrollTo(0, 0);
  }, [id, product]);

  if (!product) {
    return (
      <div className="pt-24 pb-12 min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Produto não encontrado</h2>
          <p className="text-gray-600 mb-6">
            O produto que você está procurando não está disponível ou foi removido.
          </p>
          <Link 
            to="/produtos" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeft size={18} className="mr-2" />
            Voltar para produtos
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleImageChange = (index: number) => {
    setActiveImageIndex(index);
  };

  // Format price to BRL
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="mb-6">
          <ol className="flex items-center text-sm">
            <li>
              <Link to="/" className="text-gray-500 hover:text-blue-600">Home</Link>
            </li>
            <li className="mx-2 text-gray-400">/</li>
            <li>
              <Link to="/produtos" className="text-gray-500 hover:text-blue-600">Produtos</Link>
            </li>
            <li className="mx-2 text-gray-400">/</li>
            <li>
              <Link 
                to={`/produtos?categoria=${product.category.toLowerCase()}`} 
                className="text-gray-500 hover:text-blue-600"
              >
                {product.category}
              </Link>
            </li>
            <li className="mx-2 text-gray-400">/</li>
            <li className="text-gray-700 font-medium truncate">{product.name}</li>
          </ol>
        </nav>
        
        {/* Product Detail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-square flex items-center justify-center">
              <img 
                src={product.images[activeImageIndex]} 
                alt={product.name} 
                className="max-h-full max-w-full object-contain"
              />
            </div>
            
            {/* Thumbnail Navigation */}
            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button 
                    key={index} 
                    onClick={() => handleImageChange(index)}
                    className={`w-16 h-16 rounded-md overflow-hidden border-2 ${
                      activeImageIndex === index ? 'border-blue-500' : 'border-transparent'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} - imagem ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            {/* Badges */}
            <div className="flex gap-2 mb-3">
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
              {product.featured && (
                <span className="bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  Destaque
                </span>
              )}
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {product.name}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">{product.rating} de 5 estrelas</span>
            </div>
            
            {/* Price */}
            <div className="mb-6">
              {product.oldPrice ? (
                <>
                  <span className="text-gray-400 line-through text-lg mr-2">
                    {formatPrice(product.oldPrice)}
                  </span>
                  <span className="text-red-600 text-2xl font-bold">
                    {formatPrice(product.price)}
                  </span>
                  <span className="ml-2 bg-red-100 text-red-700 text-sm px-2 py-1 rounded">
                    {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                  </span>
                </>
              ) : (
                <span className="text-gray-800 text-2xl font-bold">
                  {formatPrice(product.price)}
                </span>
              )}
              
              <p className="text-sm text-gray-600 mt-1">
                ou 10x de {formatPrice(product.price / 10)} sem juros
              </p>
            </div>
            
            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-700">{product.shortDescription}</p>
            </div>
            
            {/* Availability */}
            <div className="mb-6">
              <p className="text-sm flex items-center">
                <span className={`w-3 h-3 rounded-full mr-2 ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                {product.stock > 0 
                  ? `${product.stock} unidades em estoque` 
                  : 'Produto indisponível'
                }
              </p>
            </div>
            
            {/* Quantity selector */}
            <div className="mb-6">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Quantidade
              </label>
              <div className="flex items-center">
                <button 
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="p-2 border border-gray-300 rounded-l-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="p-2 w-16 text-center border-y border-gray-300 focus:outline-none"
                />
                <button 
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.stock}
                  className="p-2 border border-gray-300 rounded-r-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button 
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={18} className="mr-2" />
                Adicionar ao Carrinho
              </button>
              <button className="flex items-center justify-center p-3 border border-gray-300 rounded-md hover:bg-gray-50">
                <Heart size={20} className="text-gray-600" />
              </button>
              <button className="flex items-center justify-center p-3 border border-gray-300 rounded-md hover:bg-gray-50">
                <Share2 size={20} className="text-gray-600" />
              </button>
            </div>
            
            {/* Shipping */}
            <div className="p-4 bg-gray-50 rounded-md mb-6">
              <div className="flex items-start">
                <Truck className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Frete e Prazo de Entrega</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Calcule o frete e prazo de entrega para sua região
                  </p>
                  <div className="flex">
                    <input 
                      type="text" 
                      placeholder="Digite seu CEP"
                      className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button className="bg-blue-600 text-white px-3 py-2 rounded-r-md hover:bg-blue-700">
                      Calcular
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <Link 
                  key={index}
                  to={`/produtos?q=${tag}`}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded-full"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Product Description */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Descrição do Produto</h2>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Produtos Relacionados</h2>
              <Link 
                to={`/produtos?categoria=${product.category.toLowerCase()}`}
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                Ver todos
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;