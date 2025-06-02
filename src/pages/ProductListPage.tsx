import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Filter, ChevronDown, Search } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { Product } from '../types';
import { products, categories } from '../data/products';

const ProductListPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  // Extract filter parameters from URL
  const categoryParam = queryParams.get('categoria');
  const searchQuery = queryParams.get('q') || '';
  const isNewParam = queryParams.get('novidades') === 'true';
  const isSaleParam = queryParams.get('promocao') === 'true';

  // State
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(categoryParam);
  const [sortOption, setSortOption] = useState('relevancia');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  // Filter products based on URL params and state
  useEffect(() => {
    let result = [...products];
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (categoryParam) {
      const category = categories.find(c => c.slug === categoryParam);
      if (category) {
        result = result.filter(product => product.category === category.name);
        setActiveCategory(category.name);
      }
    }
    
    // Filter new products
    if (isNewParam) {
      result = result.filter(product => product.new);
    }
    
    // Filter sale products
    if (isSaleParam) {
      result = result.filter(product => product.sale);
    }
    
    // Filter by price range
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Sort products
    switch (sortOption) {
      case 'preco-menor':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'preco-maior':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'mais-recentes':
        result = result.filter(p => p.new).concat(result.filter(p => !p.new));
        break;
      case 'mais-vendidos':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default sorting by relevance (featured first)
        result = result.filter(p => p.featured).concat(result.filter(p => !p.featured));
    }
    
    setFilteredProducts(result);
  }, [categoryParam, searchQuery, isNewParam, isSaleParam, priceRange, sortOption]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with search query
    const params = new URLSearchParams(location.search);
    if (localSearchQuery) {
      params.set('q', localSearchQuery);
    } else {
      params.delete('q');
    }
    window.history.pushState({}, '', `${location.pathname}?${params.toString()}`);
    
    // Trigger re-filtering
    window.dispatchEvent(new Event('popstate'));
  };

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  const handleCategoryClick = (categoryName: string | null) => {
    setActiveCategory(categoryName);
    
    // Update URL
    const params = new URLSearchParams(location.search);
    if (categoryName) {
      const category = categories.find(c => c.name === categoryName);
      if (category) {
        params.set('categoria', category.slug);
      }
    } else {
      params.delete('categoria');
    }
    window.history.pushState({}, '', `${location.pathname}?${params.toString()}`);
    
    // Trigger re-filtering
    window.dispatchEvent(new Event('popstate'));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newRange = [...priceRange] as [number, number];
    newRange[index] = parseInt(e.target.value);
    setPriceRange(newRange);
  };

  // Generate page title based on filters
  const getPageTitle = () => {
    if (searchQuery) {
      return `Resultados para "${searchQuery}"`;
    } else if (categoryParam) {
      const category = categories.find(c => c.slug === categoryParam);
      return category ? category.name : 'Produtos';
    } else if (isNewParam) {
      return 'Novidades';
    } else if (isSaleParam) {
      return 'Ofertas';
    } else {
      return 'Todos os Produtos';
    }
  };

  return (
    <div className="pt-20 pb-12"> {/* Add padding top for the fixed header */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile Filters Button */}
          <div className="md:hidden mb-4">
            <button 
              onClick={toggleFilters}
              className="w-full py-3 px-4 bg-gray-100 rounded-md flex items-center justify-between"
            >
              <span className="flex items-center">
                <Filter size={18} className="mr-2" />
                Filtros
              </span>
              <ChevronDown size={18} className={`transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          {/* Sidebar with filters */}
          <div className={`${isFiltersOpen ? 'block' : 'hidden'} md:block w-full md:w-64 lg:w-72 flex-shrink-0`}>
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 sticky top-24">
              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Categorias</h3>
                <ul className="space-y-2">
                  <li>
                    <button 
                      onClick={() => handleCategoryClick(null)}
                      className={`text-sm ${activeCategory === null ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      Todas as Categorias
                    </button>
                  </li>
                  {categories.map(category => (
                    <li key={category.id}>
                      <button 
                        onClick={() => handleCategoryClick(category.name)}
                        className={`text-sm ${activeCategory === category.name ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Preço</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(priceRange[0])}
                    </span>
                    <span className="text-sm text-gray-600">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(priceRange[1])}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(e, 0)}
                    className="w-full h-2 bg-gray-200 rounded-md appearance-none cursor-pointer"
                  />
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(e, 1)}
                    className="w-full h-2 bg-gray-200 rounded-md appearance-none cursor-pointer"
                  />
                </div>
              </div>
              
              {/* Other Filters */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Filtros</h3>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={isNewParam}
                      onChange={() => {
                        const params = new URLSearchParams(location.search);
                        if (!isNewParam) {
                          params.set('novidades', 'true');
                        } else {
                          params.delete('novidades');
                        }
                        window.history.pushState({}, '', `${location.pathname}?${params.toString()}`);
                        window.dispatchEvent(new Event('popstate'));
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                    />
                    <span className="ml-2 text-sm text-gray-600">Novidades</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={isSaleParam}
                      onChange={() => {
                        const params = new URLSearchParams(location.search);
                        if (!isSaleParam) {
                          params.set('promocao', 'true');
                        } else {
                          params.delete('promocao');
                        }
                        window.history.pushState({}, '', `${location.pathname}?${params.toString()}`);
                        window.dispatchEvent(new Event('popstate'));
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                    />
                    <span className="ml-2 text-sm text-gray-600">Em promoção</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product listing */}
          <div className="flex-1">
            {/* Page header */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                {getPageTitle()}
              </h1>
              
              {/* Search and Sort */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <form onSubmit={handleSearch} className="relative w-full sm:w-auto sm:min-w-[300px]">
                  <input
                    type="text"
                    placeholder="Buscar produtos..."
                    value={localSearchQuery}
                    onChange={(e) => setLocalSearchQuery(e.target.value)}
                    className="pl-3 pr-10 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button 
                    type="submit" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
                  >
                    <Search size={18} />
                  </button>
                </form>
                
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <label htmlFor="sort" className="text-sm text-gray-600 whitespace-nowrap">
                    Ordenar por:
                  </label>
                  <select
                    id="sort"
                    value={sortOption}
                    onChange={handleSortChange}
                    className="border border-gray-300 rounded-md text-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="relevancia">Relevância</option>
                    <option value="preco-menor">Menor Preço</option>
                    <option value="preco-maior">Maior Preço</option>
                    <option value="mais-recentes">Mais Recentes</option>
                    <option value="mais-vendidos">Mais Vendidos</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Products grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <h3 className="text-xl font-medium text-gray-700 mb-2">Nenhum produto encontrado</h3>
                <p className="text-gray-500 mb-6">Tente ajustar os filtros ou buscar por outro termo.</p>
                <Link 
                  to="/produtos" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Ver todos os produtos
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;