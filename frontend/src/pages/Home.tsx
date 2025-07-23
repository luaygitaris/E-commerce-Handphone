import React from "react";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import Hero from "../components/home/Hero";
import { allProducts } from "../data/products";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col space-y-8 px-0 md:px-8 lg:px-12 xl:px-24 pt-4 pb-12">
      <Hero />
      
      <div className="mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-md   md:text-2xl font-bold">Featured Products</h2>
          <button
            className="text-[10px] md:text-base text-gray-600 hover:text-black transition cursor-pointer flex items-center"
            onClick={() => navigate("/shop")}>
            View All Products <span className="ml-1">→</span>
          </button>
        </div>
        
        <div className="mt-6 grid gap-2 md:gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
          {allProducts.slice(0, 10).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => {}}
            />
          ))}
        </div>
      </div>

      {/* Additional Sections */}
      <div className="mt-12">
        <h2 className="text-xl md:text-2xl font-bold mb-6">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Smartphones', 'Laptops', 'Accessories', 'Audio'].map((category) => (
            <div 
              key={category}
              className="bg-gray-50 rounded-lg p-6 flex flex-col items-center justify-center hover:bg-gray-100 transition cursor-pointer"
              onClick={() => navigate(`/shop?category=${category.toLowerCase()}`)}
            >
              <div className="h-12 w-12 bg-gray-200 rounded-full mb-3"></div>
              <h3 className="font-medium">{category}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 bg-black text-white rounded-xl p-8 md:p-12">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-6 text-gray-300">
            Subscribe to our newsletter for the latest products and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-lg text-black"
            />
            <button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;