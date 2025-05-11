import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from "../endpoint";

const Carousel = () => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  

  useEffect(() => {
    // Fetch carousel items when component mounts
    fetchCarouselItems();
  }, []);

  // Auto-advance slides
  useEffect(() => {
    if (carouselItems.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [carouselItems]);

  const fetchCarouselItems = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/api/carousel`);
      
      // Handle different response formats
      const items = Array.isArray(response.data) ? response.data : 
                   (response.data.data && Array.isArray(response.data.data)) ? response.data.data : [];
      
      setCarouselItems(items);
      setError(null);
    } catch (err) {
      console.error('Error fetching carousel items:', err);
      setError('Failed to load carousel items');
    } finally {
      setIsLoading(false);
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? carouselItems.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === carouselItems.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // For demo purposes, use placeholder data when no items are available
  const demoItems = [
    {
      title: "Experience Nature's Beauty",
      subtitle: "Discover breathtaking landscapes across the globe",
      image: "/api/placeholder/1600/900"
    },
    {
      title: "Urban Adventure Awaits",
      subtitle: "Explore the vibrant energy of metropolitan cities",
      image: "/api/placeholder/1600/900"
    },
    {
      title: "Serene Mountain Retreat",
      subtitle: "Find peace and tranquility in majestic highlands",
      image: "/api/placeholder/1600/900"
    }
  ];

  const displayItems = carouselItems.length > 0 ? carouselItems : demoItems;

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 md:h-96 lg:max-h-[500px] bg-gray-100 mx-2 md:mx-4 rounded-lg">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-3 border-gray-300 border-t-green-600 rounded-full animate-spin mb-3"></div>
          <p className="text-gray-600 text-base">Loading carousel...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-64 md:h-96 lg:max-h-[500px] bg-gray-100 mx-2 md:mx-4 rounded-lg">
        <div className="text-center">
          <p className="text-red-500 mb-3 text-base">{error}</p>
          <button 
            onClick={fetchCarouselItems} 
            className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Render carousel
  return (
    <div className="relative w-full overflow-hidden h-64 md:h-96 lg:max-h-[500px] bg-gray-900 rounded-xl shadow-xl mx-2 md:mx-4 my-2">
      {/* Main carousel */}
      <div className="relative h-full">
        {displayItems.map((item, index) => (
          <div 
            key={index} 
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Gradient overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 z-10"></div>
            
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-3">
              <div className="text-center max-w-4xl">
                <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3 text-white drop-shadow-lg">
                  {item.title}
                </h2>
                <p className="text-sm md:text-lg lg:text-xl text-white mb-4 md:mb-6 drop-shadow-md opacity-90">
                  {item.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows - smaller for mobile */}
      <button 
        onClick={goToPrevious}
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full p-2 md:p-3 z-30 transition-all hover:scale-110 shadow-md"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={goToNext}
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full p-2 md:p-3 z-30 transition-all hover:scale-110 shadow-md"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots indicator - smaller for mobile */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-30">
        {displayItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 scale-110 shadow-md' 
                : 'bg-gray-300 hover:bg-gray-100'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;