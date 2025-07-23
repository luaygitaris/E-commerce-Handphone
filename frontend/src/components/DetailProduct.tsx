import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../data/products";
import { useCart } from "../context/useCart";

const DetailProduct: React.FC = () => {
  const { id } = useParams();
  const product = id ? getProductById(id) : undefined;
  const { addToCart } = useCart();

  const [image, setImage] = useState<string>(product?.images?.[0] || "");
  const [qty, setQty] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<
    "description" | "additional" | "reviews"
  >("description");

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const total = (product.price * qty).toFixed(2);

  return (
    <div className="mt-10 lg:mt-20 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Images */}
        <div className="w-full lg:w-1/2 space-y-4">
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <img
              src={image}
              alt={product.name}
              className="w-full h-54 lg:h-96 object-contain p-4"
              loading="lazy"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {product.images.map((img, i) => (
              <div 
                key={i}
                className={`flex-shrink-0 cursor-pointer border-2 rounded-lg transition-all duration-200 ${
                  image === img ? "border-blue-500" : "border-transparent"
                }`}
                onClick={() => setImage(img)}
              >
                <img
                  src={img}
                  alt="thumbnail"
                  className="w-20 h-20 object-cover rounded"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2 space-y-2 lg:space-y-6">
          <h1 className="text-base lg:text-3xl font-bold text-gray-900">{product.name}</h1>
          
          {product.color && (
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Color:</span>
              <span className="font-medium">{product.color}</span>
            </div>
          )}
          
          <p className="text-green-600 text-lg lg:text-2xl font-bold">
            ${product.price.toFixed(2)}
          </p>

          <div className="space-y-4">
            <div className="flex flex-col gap-4">
              <div className="flex w-fit items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 bg-white">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  +
                </button>
              </div>
              <span className="text-gray-700">
                Total: <strong>${total}</strong>
              </span>
            </div>

            <button 
              onClick={() => addToCart({...product, quantity: qty})}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="border-b border-gray-200">
          <nav className="flex flex-wrap gap-4 md:gap-10">
            {(["description", "additional", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-1 capitalize text-sm md:text-base font-medium ${
                  activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab === "additional" ? "Additional Info" : tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="py-6 text-gray-700">
          {activeTab === "description" && (
            <p className="whitespace-pre-line">{product.description}</p>
          )}

          {activeTab === "additional" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.weight && (
                <div>
                  <strong className="text-gray-900">Weight:</strong> {product.weight}
                </div>
              )}
              {product.dimensions && (
                <div>
                  <strong className="text-gray-900">Dimensions:</strong> {product.dimensions}
                </div>
              )}
              {product.colours && (
                <div>
                  <strong className="text-gray-900">Colors:</strong> {product.colours}
                </div>
              )}
              {product.material && (
                <div>
                  <strong className="text-gray-900">Material:</strong> {product.material}
                </div>
              )}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-500 italic">No reviews yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;