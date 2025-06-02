import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { totalItems } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Change header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results
      window.location.href = `/produtos?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">ShopBrasil</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
              Início
            </Link>
            <Link to="/produtos" className="text-gray-700 hover:text-blue-600 font-medium">
              Produtos
            </Link>
            <Link to="/categorias" className="text-gray-700 hover:text-blue-600 font-medium">
              Categorias
            </Link>
            <Link to="/ofertas" className="text-gray-700 hover:text-blue-600 font-medium">
              Ofertas
            </Link>
          </nav>

          {/* Search, Cart & User (Desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-3 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
              >
                <Search size={18} />
              </button>
            </form>

            {/* Cart */}
            <Link to="/carrinho" className="relative">
              <ShoppingCart className="text-gray-700 hover:text-blue-600 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User */}
            <Link to={isAuthenticated ? "/perfil" : "/login"} className="flex items-center">
              <User className="text-gray-700 hover:text-blue-600 transition-colors" />
              {isAuthenticated && user && (
                <span className="ml-2 text-sm font-medium hidden lg:inline">
                  Olá, {user.name.split(' ')[0]}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link to="/carrinho" className="relative">
              <ShoppingCart className="text-gray-700" size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <button onClick={toggleMobileMenu} aria-label="Menu">
              {isMobileMenuOpen ? (
                <X className="text-gray-700\" size={24} />
              ) : (
                <Menu className="text-gray-700" size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="submit" 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  <Search size={18} />
                </button>
              </div>
            </form>
            
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium py-2">
                Início
              </Link>
              <Link to="/produtos" className="text-gray-700 hover:text-blue-600 font-medium py-2">
                Produtos
              </Link>
              <Link to="/categorias" className="text-gray-700 hover:text-blue-600 font-medium py-2">
                Categorias
              </Link>
              <Link to="/ofertas" className="text-gray-700 hover:text-blue-600 font-medium py-2">
                Ofertas
              </Link>
              <Link to={isAuthenticated ? "/perfil" : "/login"} className="text-gray-700 hover:text-blue-600 font-medium py-2">
                {isAuthenticated ? "Minha Conta" : "Entrar / Cadastrar"}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;