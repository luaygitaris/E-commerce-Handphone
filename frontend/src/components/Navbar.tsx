import { BiSearch, BiCart, BiUserCircle, BiX, BiMenu } from "react-icons/bi";
import { useState, useEffect } from "react";
import Cart from "./Cart";
import { useCart } from "../context/useCart";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, login, logout } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"signin" | "register">("signin");
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  
  // Form states
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCheckout = () => {
    localStorage.setItem("checkoutItems", JSON.stringify(cartItems));
    window.location.href = "/checkout";
  };

  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSignInData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(signInData.email, signInData.password);
    if (success) {
      alert("Login berhasil!");
      setIsAccountOpen(false);
    } else {
      alert("Email/password salah.\nCoba:\nuser@example.com / 123456");
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registering with:", registerData);
  };

  return (
    <>
      <div className={`fixed w-full z-50 flex items-center justify-between px-4 md:px-12 lg:px-24 py-3 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-2" : "bg-white shadow-sm"}`}>
        <div className="flex items-center">
          <button 
            className="mr-4 text-2xl lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <BiMenu />
          </button>
          <h3 className="text-xl md:text-2xl font-bold">
            <a href="/">SHOOPE</a>
          </h3>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <ul className="flex items-center space-x-8">
            <li>
              <a href="/shop" className="hover:text-gray-600 transition">Shop</a>
            </li>
            <li>
              <a href="/blog" className="hover:text-gray-600 transition">Blog</a>
            </li>
            <li>
              <a href="/our-story" className="hover:text-gray-600 transition">Our Story</a>
            </li>
          </ul>
          <div className="h-5 w-[1px] bg-gray-300"></div>
          <ul className="flex items-center space-x-6 text-xl">
            <li className="cursor-pointer hover:text-gray-600 transition">
              <BiSearch />
            </li>
            <li>
              <button
                className="cursor-pointer hover:text-gray-600 transition relative"
                onClick={() => setIsCartOpen(!isCartOpen)}>
                <BiCart />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </li>
            {isLoggedIn ? (
              <li>
                <button
                  className="cursor-pointer hover:text-gray-600 transition"
                  onClick={() => setIsAccountOpen(!isAccountOpen)}>
                  <BiUserCircle />
                </button>
              </li>
            ) : (
              <li>
                <button
                  onClick={() => setIsAccountOpen(true)}
                  className="bg-black text-white text-sm md:text-base cursor-pointer border border-black px-3 py-1 md:px-4 md:py-1 rounded hover:bg-gray-800 transition">
                  Login
                </button>
              </li>
            )}
          </ul>
        </nav>

        {/* Mobile Navigation Icons */}
        <div className="flex lg:hidden items-center space-x-4">
          <button className="text-xl" onClick={() => setIsCartOpen(true)}>
            <BiCart />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
          {!isLoggedIn && (
            <button
              onClick={() => setIsAccountOpen(true)}
              className="text-sm bg-black text-white px-3 py-1 rounded">
              Login
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-16 left-0 w-full bg-white shadow-lg z-40 lg:hidden">
          <ul className="py-4 px-6 space-y-4">
            <li>
              <a href="/shop" className="block py-2 hover:bg-gray-50 px-2 rounded">Shop</a>
            </li>
            <li>
              <a href="/blog" className="block py-2 hover:bg-gray-50 px-2 rounded">Blog</a>
            </li>
            <li>
              <a href="/our-story" className="block py-2 hover:bg-gray-50 px-2 rounded">Our Story</a>
            </li>
            {isLoggedIn && (
              <>
                <li>
                  <button className="block py-2 hover:bg-gray-50 px-2 rounded w-full text-left" onClick={() => setIsAccountOpen(true)}>
                    My Account
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block py-2 text-red-500 hover:bg-red-50 px-2 rounded w-full text-left">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}

      {/* Cart Slide */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsCartOpen(false)}
          ></div>
          <div className="relative w-full max-w-md h-full bg-white shadow-xl overflow-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-bold">Your Cart ({cartItems.length})</h3>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-gray-700">
                <BiX size={24} />
              </button>
            </div>
            <Cart
              cartItems={cartItems}
              onCheckout={handleCheckout}
              onRemoveItem={removeFromCart}
              onIncreaseQuantity={increaseQuantity}
              onDecreaseQuantity={decreaseQuantity}
            />
          </div>
        </div>
      )}

      {/* Account Popup */}
      {isAccountOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsAccountOpen(false)}></div>

          <div className="relative w-full max-w-md mx-4 bg-white rounded-lg shadow-xl max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">My account</h2>
              <button
                onClick={() => setIsAccountOpen(false)}
                className="text-gray-500 hover:text-gray-700">
                <BiX size={24} />
              </button>
            </div>

            <div className="p-6">
              {/* Tab Navigation */}
              <div className="flex border-b">
                <button
                  className={`flex-1 py-3 font-medium ${
                    activeTab === "signin"
                      ? "border-b-2 border-black"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("signin")}>
                  Sign in
                </button>
                <button
                  className={`flex-1 py-3 font-medium ${
                    activeTab === "register"
                      ? "border-b-2 border-black"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("register")}>
                  Register
                </button>
              </div>

              {/* Forms */}
              <div className="mt-6">
                {activeTab === "signin" ? (
                  <form onSubmit={handleSignInSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={signInData.email}
                        onChange={handleSignInChange}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={signInData.password}
                        onChange={handleSignInChange}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="remember"
                          name="remember"
                          checked={signInData.remember}
                          onChange={handleSignInChange}
                          className="mr-2"
                        />
                        <label htmlFor="remember" className="text-sm">
                          Remember me
                        </label>
                      </div>
                      <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                        Forgot password?
                      </a>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                      SIGN IN
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={registerData.name}
                        onChange={handleRegisterChange}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={registerData.email}
                        onChange={handleRegisterChange}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={registerData.password}
                        onChange={handleRegisterChange}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={registerData.confirmPassword}
                        onChange={handleRegisterChange}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                      REGISTER
                    </button>
                    <p className="text-xs text-gray-500 text-center">
                      By registering, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </form>
                )}
                {isLoggedIn && (
                  <button
                    onClick={() => {
                      logout();
                      setIsAccountOpen(false);
                    }}
                    className="mt-6 w-full py-3 border rounded-lg text-red-500 hover:bg-red-50 transition">
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;