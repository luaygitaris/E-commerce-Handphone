import { useState, useEffect } from "react";
import zflip from "../../assets/zflip.png";
import zflip2 from "../../assets/zflip2.png";
import zflip3 from "../../assets/zflip3.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Hero = () => {
  const images = [zflip, zflip2, zflip3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length, isHovered]);

  return (
    <div 
      className="relative w-full h-[50vh] md:h-[70vh] mt-16 flex justify-center items-center bg-gradient-to-r from-gray-50 to-gray-100 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Info */}
      <div className="absolute top-8 left-4 md:top-10 md:left-10 z-10 flex flex-col space-y-2 md:space-y-4 text-gray-800 bg-white/80 backdrop-blur-sm p-2 md:p-4 rounded-lg">
        <div>
          <h5 className="text-[10px] md:text-xl font-semibold">Samsung Z Flip</h5>
          <p className="text-[8px] md:text-base">Rp 28.499.000</p>
        </div>
        <button className="bg-black text-white px-2 py-1 md:px-4 md:py-2 rounded text-[8px] md:text-base hover:bg-gray-800 transition">
          View Product
        </button>
      </div>

      {/* Image */}
      <div className="w-full h-full flex justify-center items-center">
        <img
          src={images[currentIndex]}
          alt="Samsung Z Flip"
          className="h-full w-full object-contain transition-opacity duration-500"
        />
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-all ${currentIndex === index ? "bg-black w-4" : "bg-gray-300"}`}
          />
        ))}
      </div>

      {/* Arrow Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white transition z-20"
      >
        <FaChevronLeft size={16} className="text-gray-800" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white transition z-20"
      >
        <FaChevronRight size={16} className="text-gray-800" />
      </button>
    </div>
  );
};

export default Hero;