import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';




const FeaturedProducts = ({featuredProducts}) => {
  
  

  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
     <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between mb-4 sm:mb-6 md:mb-8 px-2">
  <h2 className="text-2xl md:text-3xl font-display font-bold mb-2 sm:mb-0">Featured Products</h2>
  <button 
    className="text-green-600 hover:text-green-800 transition-colors text-sm md:text-base font-medium flex items-center"
    onClick={() => navigate('/category')}
  >
    <span>View All Products</span>
    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  </button>
</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300"
            onClick={() => handleProductClick(product.id)}
          >
            <div className="relative overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
              <button 
                className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  // Add to cart logic here
                }}
              >
                <ShoppingCart className="h-5 w-5 text-green-600" />
              </button>
            </div>

            <div className="p-4">
              <div className="text-sm text-gray-500 mb-1">{product.category}</div>
              <h3 className="font-medium text-lg mb-2 group-hover:text-green-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold text-gray-900">
                  ₹{product.tenureOptions[product.tenureOptions.length - 1].price}
                </span>
               {/*  <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium text-gray-600">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">
                    ({product.reviewCount})
                  </span>
                </div> */}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;