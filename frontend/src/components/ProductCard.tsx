import React from "react";
import type { Product } from "../types";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";

interface Props {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div className="flex flex-col justify-between rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bg-white overflow-hidden border border-gray-100 hover:border-gray-200">
      <div 
        className="p-2 md:p-4 flex justify-center cursor-pointer" 
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full object-contain hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-2 md:p-4 flex flex-col justify-between h-full">
        <div>
          <h2 className="font-semibold text-[10px] md:text-lg text-gray-800 line-clamp-1 mb-1">
            {product.name}
          </h2>
          <p className="text-sm text-gray-500 line-clamp-2 mb-3">
            {product.description}
          </p>
          <p className="text-green-600 font-bold text-sm md:text-lg">
            Rp {product.price.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mt-4 text-[10px] lg:text-sm">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white md:font-medium px-4 py-2 rounded-lg transition-colors duration-300 active:scale-95"
          >
            Add to Cart
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${product.id}`);
            }}
            className="w-full lg:w-fit bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded-lg transition-colors duration-300 active:scale-95"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;