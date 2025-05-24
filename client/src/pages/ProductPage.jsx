import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Heart, HelpCircle, Info, NotebookPen, ShieldCheck, ShoppingCart } from 'lucide-react';
import FAQ from '../components/Faq';
import { useCart } from '../Context/CartContext';
import { useNavigate, useParams } from 'react-router-dom';
import QuantitySelector from '../components/QuantitySelector';
import SpecialOffers from '../components/SpecialOffers';
import { fetchProducts, getProduct } from '../services/Productapi';
import { FaTape } from 'react-icons/fa';
import { getAuth } from 'firebase/auth';

// Skeleton Loader Component
const ProductSkeleton = () => (
  <div className="w-[92vw] p-4 animate-pulse">
    <div className="flex flex-col md:flex-row gap-8">
      {/* Image skeleton */}
      <div className="md:w-[75%]">
        <div className="h-[600px] bg-gray-200 rounded-lg"></div>
        <div className="flex gap-2 mt-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
      {/* Details skeleton */}
      <div className="md:w-[25%] min-w-[300px]">
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        <div className="h-32 bg-gray-200 rounded mb-4"></div>
        <div className="h-24 bg-gray-200 rounded mb-4"></div>
        <div className="h-20 bg-gray-200 rounded mb-4"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

// Error Boundary Component
const ErrorFallback = ({ error, retry }) => (
  <div className="text-center p-8">
    <div className="text-red-500 mb-4">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="text-gray-600 mt-2">Failed to load product details</p>
    </div>
    <button 
      onClick={retry}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Try Again
    </button>
  </div>
);

// Memoized Login Popup
const LoginPopup = React.memo(({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-lg shadow-lg max-w-md w-full border border-white border-opacity-20">
        <h2 className="text-xl font-bold mb-4">Login Required</h2>
        <p className="mb-6">Please login to add items to your cart.</p>
        <div className="flex justify-end space-x-4">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button 
            onClick={onLogin}
            className="px-4 py-2 bg-green-600 bg-opacity-90 text-white rounded hover:bg-green-700"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
});

// Memoized Image Gallery
const ImageGallery = React.memo(({ images, currentImageIndex, onPrevImage, onNextImage, onImageSelect, productName }) => (
  <>
    <div className="relative h-[600px] bg-gray-50 rounded-lg">
      <img
        src={images[currentImageIndex]}
        alt={productName}
        className="w-full h-full object-contain"
        loading="eager" // Load main image immediately
      />
      <button
        onClick={onPrevImage}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={onNextImage}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
    <div className="flex gap-2 mt-4 overflow-x-auto">
      {images.map((img, index) => (
        <button
          key={index}
          onClick={() => onImageSelect(index)}
          className={`flex-shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden
            ${currentImageIndex === index ? 'border-blue-500' : 'border-gray-200'}`}
        >
          <img 
            src={img} 
            alt="" 
            className="w-full h-full object-cover" 
            loading="lazy" // Lazy load thumbnail images
          />
        </button>
      ))}
    </div>
  </>
));

const ProductPage = () => {
  const { productId } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTenure, setSelectedTenure] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const user = getAuth().currentUser;

  // Memoized values
  const currentTenure = useMemo(() => {
    return product?.tenureOptions?.[selectedTenure] || { months: 0, price: 0 };
  }, [product, selectedTenure]);

  const totalPrice = useMemo(() => {
    if (product?.tenureOptions?.[selectedTenure]) {
      return product.tenureOptions[selectedTenure].price * quantity;
    }
    return 'Price not available';
  }, [product, selectedTenure, quantity]);

  // Optimized fetch function with error handling
  const fetchProductData = useCallback(async () => {
    if (!productId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const fetchedProduct = await getProduct(productId);
      
      if (!fetchedProduct) {
        throw new Error('Product not found');
      }
      
      setProduct(fetchedProduct);
      
      // Set default tenure if available
      if (fetchedProduct.tenureOptions?.length > 0) {
        setSelectedTenure(0);
      }
      
    } catch (error) {
      console.error("Error fetching product:", error);
      setError(error.message || 'Failed to load product');
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProductData();
  }, [fetchProductData]);

  // Memoized event handlers
  const nextImage = useCallback(() => {
    if (!product?.images) return;
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  }, [product?.images]);

  const prevImage = useCallback(() => {
    if (!product?.images) return;
    setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  }, [product?.images]);

  const handleImageSelect = useCallback((index) => {
    setCurrentImageIndex(index);
  }, []);

  const handleSliderChange = useCallback((e) => {
    setSelectedTenure(Number(e.target.value));
  }, []);

  const handleAddToCart = useCallback(() => {
    if (!user) {
      setIsLoginPopupOpen(true);
      return;
    }

    if (product?.tenureOptions?.[selectedTenure]) {
      const selectedTenureOption = product.tenureOptions[selectedTenure];
      addToCart(
        product, 
        selectedTenureOption.months, 
        selectedTenureOption.price,
        quantity
      );
      // Use a toast notification instead of alert for better UX
      alert("Added to cart!");
    } else {
      console.error("Selected tenure option is undefined");
      alert("Please select a valid tenure option");
    }
  }, [user, product, selectedTenure, quantity, addToCart]);

  const handleLogin = useCallback(() => {
    setIsLoginPopupOpen(false);
    navigate('/login'); // Use navigate instead of window.location.href
  }, [navigate]);

  const handleQuantityIncrease = useCallback(() => {
    setQuantity(prev => prev + 1);
  }, []);

  const handleQuantityDecrease = useCallback(() => {
    setQuantity(prev => Math.max(1, prev - 1));
  }, []);

  // Loading state
  if (loading) {
    return <ProductSkeleton />;
  }

  // Error state
  if (error || !product) {
    return <ErrorFallback error={error} retry={fetchProductData} />;
  }

  // No images state
  if (!product.images || product.images.length === 0) {
    return <div className="text-center text-gray-500 p-8">Product images not available</div>;
  }

  return (
    <div className="w-[92vw] p-4">
      <LoginPopup 
        isOpen={isLoginPopupOpen} 
        onClose={() => setIsLoginPopupOpen(false)}
        onLogin={handleLogin}
      />
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side - Image gallery */}
        <div className="md:w-[75%]">
          <ImageGallery
            images={product.images}
            currentImageIndex={currentImageIndex}
            onPrevImage={prevImage}
            onNextImage={nextImage}
            onImageSelect={handleImageSelect}
            productName={product.name}
          />
        </div>

        {/* Right side - Product details */}
        <div className="md:w-[25%] min-w-[300px] mb-16">
          <div className="space-y-6">
            {/* Product Title */}
            <h1 className="text-2xl font-medium text-gray-900">{product.name}</h1>
            
            <div className='bg-gray-50 p-4 rounded-lg border border-gray-100'>
              <h2 className='font-semibold mb-2'>Product Description:</h2>
              {product.description}
              <div className='m-2'></div>
              <h2 className='font-semibold mb-2'>Product Dimensions:</h2>
              {product.dimensions}
            </div>

            {/* Tenure Selector */}
            {product.tenureOptions && product.tenureOptions.length > 0 && (
              <div className="space-y-4 border-2 p-4 border-gray-100 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <h3 className="font-medium">Choose Tenure (months)</h3>
                  </div>
                </div>
                
                <div className="relative pt-6">
                  <style>
                    {`
                      .custom-range {
                        -webkit-appearance: none;
                        width: 100%;
                        height: 6px;
                        background: #e5e7eb;
                        border-radius: 9999px;
                        outline: none;
                        padding: 0;
                        margin: 0;
                        transition: background 0.3s ease;
                      }

                      .custom-range::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        appearance: none;
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        background: #22c55e;
                        cursor: pointer;
                        border: 3px solid white;
                        box-shadow: 0 0 0 1px #22c55e;
                        margin-top: -7px;
                        transition: all 0.3s ease;
                      }

                      .custom-range::-moz-range-thumb {
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        background: #22c55e;
                        cursor: pointer;
                        border: 3px solid white;
                        box-shadow: 0 0 0 1px #22c55e;
                        margin-top: -7px;
                        transition: all 0.3s ease;
                      }

                      .custom-range::-webkit-slider-runnable-track {
                        width: 100%;
                        height: 6px;
                        background: linear-gradient(to right, #22c55e 0%, #22c55e ${(selectedTenure / (product.tenureOptions?.length - 1 || 1)) * 100}%, #e5e7eb ${(selectedTenure / (product.tenureOptions?.length - 1 || 1)) * 100}%, #e5e7eb 100%);
                        border-radius: 9999px;
                        transition: background 0.3s ease;
                      }

                      .custom-range::-moz-range-track {
                        width: 100%;
                        height: 6px;
                        background: linear-gradient(to right, #22c55e 0%, #22c55e ${(selectedTenure / (product.tenureOptions?.length - 1 || 1)) * 100}%, #e5e7eb ${(selectedTenure / (product.tenureOptions?.length - 1 || 1)) * 100}%, #e5e7eb 100%);
                        border-radius: 9999px;
                        transition: background 0.3s ease;
                      }

                      .custom-range:hover::-webkit-slider-thumb {
                        background: #16a34a;
                        box-shadow: 0 0 0 1px #16a34a;
                      }

                      .custom-range:hover::-moz-range-thumb {
                        background: #16a34a;
                        box-shadow: 0 0 0 1px #16a34a;
                      }
                    `}
                  </style>
                  
                  <input
                    type="range"
                    min="0"
                    max={product.tenureOptions.length - 1}
                    value={selectedTenure}
                    step="1"
                    onChange={handleSliderChange}
                    className="custom-range"
                  />
                  <div className="flex justify-between mt-4">
                    {product.tenureOptions.map((option, index) => (
                      <div 
                        key={index} 
                        className={`flex flex-col items-center cursor-pointer ${selectedTenure === index ? 'text-green-500 font-bold' : ''}`}
                        onClick={() => setSelectedTenure(index)}
                      >
                        <span className="text-sm font-medium">{option.months}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Price and Benefits */}
            <div className="bg-gray-50 rounded-lg p-5 border-2 border-gray-100">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">
                      {currentTenure.price ? `₹${currentTenure.price}` : 'Price not available'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">Monthly Rent for {currentTenure.months} months</p>
                  <p className="text-sm text-gray-500 font-bold">
                    Refundable Deposit: ₹{currentTenure.price ? currentTenure.price * 2 : 0}
                  </p>
                </div>
              </div>
              
              <div className="pt-3 mt-3 border-t border-gray-200">
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-700">
                    Total ({quantity} {quantity === 1 ? 'item' : 'items'})
                  </p>
                  <p className="text-lg font-bold text-gray-900">₹{totalPrice}</p>
                </div>
              </div>
            </div>

            {/* Book Button */}
            <div className="flex mt-6 space-x-4">
              <div className='flex gap-4'>
                <QuantitySelector 
                  quantity={quantity} 
                  onIncrease={handleQuantityIncrease} 
                  onDecrease={handleQuantityDecrease} 
                />
                <button
                  className="bg-primary px-6 py-3 rounded-lg hover:bg-primary-dark transition cursor-pointer border-2 border-gray-200"
                  onClick={handleAddToCart}
                >
                  Add to Cart 🛒
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;