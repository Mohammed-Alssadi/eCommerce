import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../features/products/productSlice";
import {
  User,
  ShoppingCart,
  Search,
  Menu,
  X,
  Check,
  Info,
  Armchair,
} from "lucide-react";
import Cart from "./Cart";

function Navbar() {
  // ===================== الحالة =====================
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  // ===================== الإعدادات العامة =====================
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // ===================== تأثير التمرير =====================
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ===================== البحث =====================
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim() === "") return;
    dispatch(setSearchTerm(searchInput.trim()));
    navigate("/search");
    setIsSearchOpen(false);
    setSearchInput("");
  };

  // ===================== JSX =====================
  return (
    <>
      {/* مساحة لتعويض الهيدر الثابت */}
      <div className="h-32"></div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? "bg-white/80 shadow-md backdrop-blur-lg bg-slate-50"
            : "bg-transparent shadow-none"
        }`}
      >
        {/* الشريط العلوي */}
        <div className={`bg-pink-700 px-4 py-2 ${isScrolled ? "hidden" : ""}`}>
          <div className="flex justify-between items-center gap-2 text-white text-sm">
            <p className="flex items-center gap-2">
              <Check size={16} /> Free on all orders over $50
            </p>

            <div className="flex items-center gap-4">
              <select className="bg-transparent border-none outline-none text-white">
                <option className="text-black bg-white">English</option>
                <option className="text-black bg-white">العربية</option>
                <option className="text-black bg-white">Español</option>
              </select>

              <Link to="/faqs" className="hidden sm:block hover:underline">
                FAQs
              </Link>

              <Link
                to="/help"
                className="hidden sm:flex items-center gap-1 hover:underline"
              >
                <Info size={16} /> Need help
              </Link>
            </div>
          </div>
        </div>

        {/* الهيدر الرئيسي */}
        <div className="py-5">
          <div className="container mx-3 md:mx-auto px-1 flex items-center justify-between">
            {/* الشعار */}
            <Link
              to="/"
              className="text-xl md:text-3xl font-bold flex items-center gap-2 text-pink-600"
            >
              <Armchair size="2.5rem" className="text-pink-800" /> comforty
            </Link>

            {/* بحث الجوال */}
            <div className="lg:hidden ml-12 pt-2">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="px-2 text-pink-700 hover:bg-gray-200 rounded-full"
              >
                <Search size={26} />
              </button>
            </div>

            {/* نافذة البحث للجوال */}
            {isSearchOpen && (
              <div className="absolute top-full left-0 right-0 bg-white p-4 shadow-lg lg:hidden z-50">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="bg-pink-600 text-white px-4 rounded hover:bg-pink-700"
                  >
                    Go
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="p-2 text-gray-500"
                  >
                    <X size={20} />
                  </button>
                </form>
              </div>
            )}

            {/* روابط التصفح - للشاشات الكبيرة */}
            <nav className="hidden lg:flex gap-6">
              <Link to="/" className="text-cyan-900 font-medium hover:text-cyan-900">
                Home
              </Link>
               <Link to="/categories" className="text-cyan-900 font-medium hover:text-cyan-900">
                Categories
              </Link>
              <Link to="/products" className="text-cyan-800 font-medium hover:text-cyan-900">
                Products
              </Link>
              <Link to="/" className="text-cyan-800 font-medium hover:text-cyan-900">
                FAQs
              </Link>
              <Link to="/#footer" className="text-cyan-800 font-medium hover:text-cyan-900">
                Contact
              </Link>
            </nav>

            {/* مربع البحث الكبير */}
            <div className="hidden lg:block flex-1 max-w-md mx-6">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search here..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full h-10 bg-gray-200 rounded-lg pl-4 pr-10 focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-500 hover:text-pink-700"
                >
                  <Search size={20} />
                </button>
              </form>
            </div>

            {/* الأيقونات */}
            <div
              className="flex items-center gap-4 sm:gap-5 md:gap-6 lg:gap-8 ml-2"
              onMouseLeave={() =>
                setTimeout(() => setIsUserMenuOpen(false), 5000)
              }
            >
              {/* أيقونة السلة */}
              <div className="relative">
                <ShoppingCart
                  onClick={() => setCartOpen(true)}
                  size={28}
                  className="text-pink-700 hover:text-pink-900 cursor-pointer"
                />
                <Cart visible={cartOpen} setvisible={setCartOpen} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </div>

              {/* أيقونة المستخدم */}
              <div className="relative hidden md:block">
                <User
                  size={28}
                  className="text-pink-700 hover:text-pink-900 cursor-pointer"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                />
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                    <Link
                      to="/"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      My Account
                    </Link>
                  </div>
                )}
              </div>

              {/* قائمة الجوال */}
              <button
                className="lg:hidden text-pink-700 hover:bg-gray-200 rounded-full ml-3"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {/* القائمة المنسدلة للجوال */}
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-pink-50 border-t border-gray-200">
              <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
                {["Home","Categories" ,"Products", "FAQs", "Contact", "Sign In", "My Account"].map((item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                    className="py-2 text-cyan-800 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Navbar;
