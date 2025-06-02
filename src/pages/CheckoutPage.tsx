import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const CheckoutPage: React.FC = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user, updateUserInfo, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    cpf: '',
    phone: '',
    address: {
      zipCode: user?.address?.zipCode || '',
      street: user?.address?.street || '',
      number: user?.address?.number || '',
      complement: user?.address?.complement || '',
      neighborhood: user?.address?.neighborhood || '',
      city: user?.address?.city || '',
      state: user?.address?.state || ''
    },
    payment: {
      method: 'credit',
      cardNumber: '',
      cardName: '',
      expiry: '',
      cvv: '',
      installments: '1'
    },
    saveInfo: true
  });
  
  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=checkout');
    }
  }, [isAuthenticated, navigate]);
  
  // Redirect to cart if empty
  React.useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/carrinho');
    }
  }, [cartItems, navigate]);

  // Format price to BRL
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle nested objects (address, payment)
    if (name.includes('.')) {
      const [parentKey, childKey] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parentKey]: {
          ...prev[parentKey as keyof typeof prev],
          [childKey]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleNext = () => {
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save user address if requested
    if (formData.saveInfo && user) {
      updateUserInfo({
        ...user,
        address: formData.address
      });
    }
    
    // Simulate order processing
    setStep(3);
    
    // Clear cart after successful order
    setTimeout(() => {
      clearCart();
    }, 1000);
  };

  // Calculate shipping (free for orders over R$200)
  const shippingPrice = totalPrice >= 200 ? 0 : 15.90;
  const orderTotal = totalPrice + shippingPrice;

  return (
    <div className="pt-24 pb-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Finalizar Compra</h1>
          
          {/* Steps */}
          <div className="flex items-center justify-center mt-8">
            <div className="flex items-center space-x-4 sm:space-x-8">
              <div className={`flex flex-col items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}>
                  1
                </div>
                <span className="text-sm mt-1">Endereço</span>
              </div>
              
              <div className={`w-16 sm:w-24 h-0.5 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              
              <div className={`flex flex-col items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}>
                  2
                </div>
                <span className="text-sm mt-1">Pagamento</span>
              </div>
              
              <div className={`w-16 sm:w-24 h-0.5 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              
              <div className={`flex flex-col items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}>
                  3
                </div>
                <span className="text-sm mt-1">Confirmação</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Checkout Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Step 1: Address */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Informações de Entrega</h2>
                  
                  <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Nome Completo
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          E-mail
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">
                          CPF
                        </label>
                        <input
                          type="text"
                          id="cpf"
                          name="cpf"
                          value={formData.cpf}
                          onChange={handleInputChange}
                          placeholder="000.000.000-00"
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Telefone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(00) 00000-0000"
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <label htmlFor="address.zipCode" className="block text-sm font-medium text-gray-700">
                          CEP
                        </label>
                        <a href="https://buscacepinter.correios.com.br/app/endereco/index.php" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600">
                          Não sei meu CEP
                        </a>
                      </div>
                      <input
                        type="text"
                        id="address.zipCode"
                        name="address.zipCode"
                        value={formData.address.zipCode}
                        onChange={handleInputChange}
                        placeholder="00000-000"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="md:col-span-2">
                        <label htmlFor="address.street" className="block text-sm font-medium text-gray-700 mb-1">
                          Rua
                        </label>
                        <input
                          type="text"
                          id="address.street"
                          name="address.street"
                          value={formData.address.street}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="address.number" className="block text-sm font-medium text-gray-700 mb-1">
                          Número
                        </label>
                        <input
                          type="text"
                          id="address.number"
                          name="address.number"
                          value={formData.address.number}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="address.complement" className="block text-sm font-medium text-gray-700 mb-1">
                        Complemento (opcional)
                      </label>
                      <input
                        type="text"
                        id="address.complement"
                        name="address.complement"
                        value={formData.address.complement}
                        onChange={handleInputChange}
                        placeholder="Apartamento, bloco, referência..."
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label htmlFor="address.neighborhood" className="block text-sm font-medium text-gray-700 mb-1">
                          Bairro
                        </label>
                        <input
                          type="text"
                          id="address.neighborhood"
                          name="address.neighborhood"
                          value={formData.address.neighborhood}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="address.city" className="block text-sm font-medium text-gray-700 mb-1">
                          Cidade
                        </label>
                        <input
                          type="text"
                          id="address.city"
                          name="address.city"
                          value={formData.address.city}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="address.state" className="block text-sm font-medium text-gray-700 mb-1">
                          Estado
                        </label>
                        <select
                          id="address.state"
                          name="address.state"
                          value={formData.address.state}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          <option value="">Selecione</option>
                          <option value="AC">Acre</option>
                          <option value="AL">Alagoas</option>
                          <option value="AP">Amapá</option>
                          <option value="AM">Amazonas</option>
                          <option value="BA">Bahia</option>
                          <option value="CE">Ceará</option>
                          <option value="DF">Distrito Federal</option>
                          <option value="ES">Espírito Santo</option>
                          <option value="GO">Goiás</option>
                          <option value="MA">Maranhão</option>
                          <option value="MT">Mato Grosso</option>
                          <option value="MS">Mato Grosso do Sul</option>
                          <option value="MG">Minas Gerais</option>
                          <option value="PA">Pará</option>
                          <option value="PB">Paraíba</option>
                          <option value="PR">Paraná</option>
                          <option value="PE">Pernambuco</option>
                          <option value="PI">Piauí</option>
                          <option value="RJ">Rio de Janeiro</option>
                          <option value="RN">Rio Grande do Norte</option>
                          <option value="RS">Rio Grande do Sul</option>
                          <option value="RO">Rondônia</option>
                          <option value="RR">Roraima</option>
                          <option value="SC">Santa Catarina</option>
                          <option value="SP">São Paulo</option>
                          <option value="SE">Sergipe</option>
                          <option value="TO">Tocantins</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="saveInfo"
                          checked={formData.saveInfo}
                          onChange={(e) => setFormData(prev => ({ ...prev, saveInfo: e.target.checked }))}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Salvar informações para próximas compras
                        </span>
                      </label>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <button
                        type="button"
                        onClick={handleNext}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-medium"
                      >
                        Continuar para Pagamento
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Step 2: Payment */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Informações de Pagamento</h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <label className="flex items-center p-4 border rounded-md cursor-pointer bg-blue-50 border-blue-500 flex-1">
                          <input
                            type="radio"
                            name="payment.method"
                            value="credit"
                            checked={formData.payment.method === 'credit'}
                            onChange={handleInputChange}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 flex items-center">
                            <CreditCard size={20} className="mr-2 text-blue-600" />
                            <span>Cartão de Crédito</span>
                          </span>
                        </label>
                        
                        <label className="flex items-center p-4 border rounded-md cursor-pointer border-gray-300 flex-1">
                          <input
                            type="radio"
                            name="payment.method"
                            value="pix"
                            checked={formData.payment.method === 'pix'}
                            onChange={handleInputChange}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 flex items-center">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                              <path d="M10.7364 2.08033C11.0912 1.72555 11.6658 1.72555 12.0205 2.08033L17.9196 7.97938C18.2744 8.33416 18.2744 8.90872 17.9196 9.2635L12.0205 15.1626C11.6658 15.5173 11.0912 15.5173 10.7364 15.1626C10.3817 14.8078 10.3817 14.2332 10.7364 13.8784L15.3149 9.30001H11.25C10.0074 9.30001 9 10.3074 9 11.55V17.85C9 18.3471 8.59706 18.75 8.1 18.75C7.60294 18.75 7.2 18.3471 7.2 17.85V11.55C7.2 9.31339 9.01339 7.50001 11.25 7.50001H15.3149L10.7364 2.92157C10.3817 2.56679 10.3817 1.99223 10.7364 1.63745V1.63745Z" fill="#2563EB"/>
                              <path d="M2.08033 10.7364C1.72555 11.0912 1.72555 11.6658 2.08033 12.0205L7.97938 17.9196C8.33416 18.2744 8.90872 18.2744 9.2635 17.9196C9.61827 17.5648 9.61827 16.9903 9.2635 16.6355L4.68507 12.0571H8.75C9.99264 12.0571 11 11.0497 11 9.80708V3.50708C11 3.01002 11.4029 2.60708 11.9 2.60708C12.3971 2.60708 12.8 3.01002 12.8 3.50708V9.80708C12.8 12.0437 10.9866 13.8571 8.75 13.8571H4.68507L9.2635 18.4355C9.61827 18.7903 9.61827 19.3648 9.2635 19.7196C8.90872 20.0744 8.33416 20.0744 7.97938 19.7196L2.08033 13.8205C1.72555 13.4658 1.72555 12.8912 2.08033 12.5364V12.5364Z" fill="#2563EB"/>
                            </svg>
                            <span>PIX</span>
                          </span>
                        </label>
                      </div>
                    </div>
                    
                    {formData.payment.method === 'credit' && (
                      <>
                        <div className="mb-4">
                          <label htmlFor="payment.cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Número do Cartão
                          </label>
                          <input
                            type="text"
                            id="payment.cardNumber"
                            name="payment.cardNumber"
                            value={formData.payment.cardNumber}
                            onChange={handleInputChange}
                            placeholder="0000 0000 0000 0000"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="payment.cardName" className="block text-sm font-medium text-gray-700 mb-1">
                            Nome no Cartão
                          </label>
                          <input
                            type="text"
                            id="payment.cardName"
                            name="payment.cardName"
                            value={formData.payment.cardName}
                            onChange={handleInputChange}
                            placeholder="Como aparece no cartão"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <label htmlFor="payment.expiry" className="block text-sm font-medium text-gray-700 mb-1">
                              Validade
                            </label>
                            <input
                              type="text"
                              id="payment.expiry"
                              name="payment.expiry"
                              value={formData.payment.expiry}
                              onChange={handleInputChange}
                              placeholder="MM/AA"
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="payment.cvv" className="block text-sm font-medium text-gray-700 mb-1">
                              Código de Segurança
                            </label>
                            <input
                              type="text"
                              id="payment.cvv"
                              name="payment.cvv"
                              value={formData.payment.cvv}
                              onChange={handleInputChange}
                              placeholder="CVV"
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="payment.installments" className="block text-sm font-medium text-gray-700 mb-1">
                            Parcelas
                          </label>
                          <select
                            id="payment.installments"
                            name="payment.installments"
                            value={formData.payment.installments}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          >
                            <option value="1">1x de {formatPrice(orderTotal)} (à vista)</option>
                            <option value="2">2x de {formatPrice(orderTotal / 2)} sem juros</option>
                            <option value="3">3x de {formatPrice(orderTotal / 3)} sem juros</option>
                            <option value="4">4x de {formatPrice(orderTotal / 4)} sem juros</option>
                            <option value="5">5x de {formatPrice(orderTotal / 5)} sem juros</option>
                            <option value="6">6x de {formatPrice(orderTotal / 6)} sem juros</option>
                            <option value="10">10x de {formatPrice(orderTotal / 10)} sem juros</option>
                          </select>
                        </div>
                      </>
                    )}
                    
                    {formData.payment.method === 'pix' && (
                      <div className="bg-gray-50 p-6 rounded-md text-center">
                        <div className="mb-4">
                          <div className="w-48 h-48 bg-white p-3 mx-auto">
                            <div className="border-2 border-gray-800 w-full h-full flex items-center justify-center">
                              <div className="text-gray-800 font-mono text-sm">
                                Código PIX<br />Simulado
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-2">
                          Escaneie o QR Code ou copie o código PIX
                        </p>
                        <button type="button" className="text-blue-600 font-medium text-sm flex items-center mx-auto">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                            <path d="M8 5H6C5.44772 5 5 5.44772 5 6V8M5 16V18C5 18.5523 5.44772 19 6 19H8M16 19H18C18.5523 19 19 18.5523 19 18V16M19 8V6C19 5.44772 18.5523 5 18 5H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Copiar código PIX
                        </button>
                      </div>
                    )}
                    
                    <div className="mt-6 flex justify-between">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="text-gray-600 hover:text-gray-800 font-medium"
                      >
                        Voltar
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-medium"
                      >
                        Finalizar Pedido
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Step 3: Confirmation */}
              {step === 3 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Pedido Confirmado!</h2>
                  <p className="text-gray-600 mb-6">
                    Seu pedido foi realizado com sucesso e já está sendo processado.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-md max-w-md mx-auto mb-6">
                    <p className="font-medium text-gray-800">
                      Número do Pedido: <span className="font-mono">#54321</span>
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/')}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-medium"
                  >
                    Continuar Comprando
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Resumo do Pedido</h2>
              
              <div className="mb-4">
                <div className="max-h-60 overflow-y-auto pr-2">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex py-3 border-b border-gray-100">
                      <div className="w-16 h-16 flex-shrink-0 mr-4">
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name} 
                          className="w-16 h-16 object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-1">
                          {item.product.name}
                        </h3>
                        <p className="text-gray-500 text-xs mb-1">Qtd: {item.quantity}</p>
                        <p className="text-gray-800 font-medium text-sm">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-800 font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Frete</span>
                  <span className="text-gray-800 font-medium">
                    {shippingPrice === 0 ? 'Grátis' : formatPrice(shippingPrice)}
                  </span>
                </div>
                {shippingPrice === 0 && (
                  <div className="flex justify-between text-green-600 text-sm">
                    <span>Frete Grátis</span>
                    <span>-{formatPrice(15.90)}</span>
                  </div>
                )}
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-800 font-bold">Total</span>
                  <span className="text-gray-800 font-bold text-xl">{formatPrice(orderTotal)}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {formData.payment.method === 'credit' && formData.payment.installments !== '1' && (
                    <span>
                      ou {formData.payment.installments}x de {formatPrice(orderTotal / parseInt(formData.payment.installments))} sem juros
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <ShoppingBag size={16} className="mr-2 text-blue-600" />
                <span>Garantia de 30 dias para devolução</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;