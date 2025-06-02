import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/products';

const CategorySection: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Categorias em Destaque</h2>
          <p className="text-gray-600">Explore nossa seleção de produtos por categoria</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/produtos?categoria=${category.slug}`}
              className="group"
            >
              <div className="rounded-lg overflow-hidden shadow-md relative h-60">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 w-full">
                    <h3 className="text-xl font-semibold text-white mb-1">{category.name}</h3>
                    <div className="w-8 h-1 bg-blue-500 rounded transform origin-left transition-all duration-300 group-hover:w-16"></div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;