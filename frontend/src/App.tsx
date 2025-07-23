import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import DetailProduct from "./components/DetailProduct";
import Shop from "./pages/Shop";
import Footer from "./components/Footer";
import ContactPage from "./pages/ContactPage";
import { CartProvider } from "./context/CartProvider";
import BlogPage from "./pages/Blog";
import BlogDetailPage from "./components/DetailBlog";
import OurStory from "./pages/OurStory";
import { AuthProvider } from "./context/AuthContext";
import Payment from "./pages/Payment";

const App = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <div className=" px-2 md:px-[96px]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/product/:id" element={<DetailProduct />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogDetailPage />} />
              <Route path="/our-story" element={<OurStory />} />
              <Route path="/payment" element={<Payment />} />
            </Routes>
          </div>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
