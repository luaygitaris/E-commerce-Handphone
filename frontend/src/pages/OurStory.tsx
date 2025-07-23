import ourstory from '../assets/ourstory1.jpg';

const OurStory = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-10">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 sm:p-8 md:p-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Story</h1>
            
            <div className="prose prose-lg text-gray-600 space-y-4">
              <p>
                SHOOPE was founded with the spirit of bringing the best electronic shopping experience. We believe that everyone deserves the best technology without compromise.
              </p>

              <p>
                Starting from a small store, we have now become an online destination for gadget lovers, especially Samsung phones. With the most complete collection, competitive prices, and the best customer service, we continue to grow thanks to your support.
              </p>

              <p>
                We are committed to continue providing quality products, comfortable shopping experience, and informative content through our blog. Thank you for being part of our story!
              </p>
            </div>

            <div className="mt-10 rounded-xl overflow-hidden shadow-lg">
              <img 
                src={ourstory} 
                alt="Our Story" 
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105" 
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;