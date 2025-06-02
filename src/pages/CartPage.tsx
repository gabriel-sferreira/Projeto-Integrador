import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard, Truck } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Format price to BRL
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleProceedToCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login?redirect=checkout');
    }
  };

  return (
    <div className="pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Carrinho de Compras</h1>
        
        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Produto
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Preço
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantidade
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {cartItems.map((item) => (
                        <tr key={item.product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-16 w-16 mr-4">
                                <img 
                                  src={item.product.images[0]} 
                                  alt={item.product.name} 
                                  className="h-16 w-16 object-cover rounded"
                                />
                              </div>
                              <div>
                                <Link 
                                  to={`/produto/${item.product.id}`} 
                                  className="text-sm font-medium text-gray-900 hover:text-blue-600"
                                >
                                  {item.product.name}
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatPrice(item.product.price)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <button 
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="p-1 rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="mx-2 w-8 text-center text-sm text-gray-700">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                disabled={item.quantity >= item.product.stock}
                                className="p-1 rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {formatPrice(item.product.price * item.quantity)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button 
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mt-4 flex justify-between">
                <Link 
                  to="/produtos" 
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <ArrowLeft size={16} className="mr-1" />
                  Continuar Comprando
                </Link>
                <button 
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Limpar Carrinho
                </button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Resumo do Pedido</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-800 font-medium">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frete</span>
                    <span className="text-gray-800 font-medium">Calculado no checkout</span>
                  </div>
                  {totalPrice >= 200 && (
                    <div className="flex justify-between text-green-600">
                      <span>Frete Grátis</span>
                      <span>Qualificado</span>
                    </div>
                  )}
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-bold">Total</span>
                    <span className="text-gray-800 font-bold text-xl">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleProceedToCheckout}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium flex items-center justify-center"
                >
                  <CreditCard size={18} className="mr-2" />
                  Finalizar Compra
                </button>
                
                <div className="mt-6 space-y-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Truck size={16} className="mr-2 text-blue-600" />
                    <span>Frete grátis em compras acima de R$ 200</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <ShoppingBag size={16} className="mr-2 text-blue-600" />
                    <span>Garantia de 30 dias para devolução</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag size={24} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Seu carrinho está vazio</h2>
            <p className="text-gray-600 mb-6">
              Parece que você ainda não adicionou produtos ao seu carrinho.
            </p>
            <Link 
              to="/produtos" 
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium inline-block"
            >
              Começar a Comprar
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;