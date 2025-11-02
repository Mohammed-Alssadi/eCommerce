import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'
import React from 'react'
import { Armchair } from 'lucide-react'
function Footer() {
  return (
    <footer id="footer" className="bg-pink-800 shadow-md mt-6 text-white">
      {/* Newsletter Section */}
      <div className="container mx-auto px-4">
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center md:text-left">
            Subscribe to Our Newsletter
          </h2>

          <form className="w-full md:w-1/3 relative">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="py-3 px-4 rounded-full shadow-md w-full text-sm sm:text-base focus:outline-none"
            />
            <button className="bg-pink-600 text-white hover:bg-pink-700 py-2 px-4 rounded-full absolute top-1/2 -translate-y-1/2 right-2 text-sm sm:text-base">
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-pink-700 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <Link
              to="/"
              className="text-xl md:text-3xl font-bold flex items-center gap-2 text-white mb-3"
            >
              <Armchair size="2.5rem" className="text-white" /> comforty
            </Link>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                veniam aliquid labore perferendis dolorem doloremque accusamus
                atque ex.
              </p>

              <div className="flex items-center gap-4 mt-4 justify-center sm:justify-start">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <Icon
                    key={i}
                    size={30}
                    className="bg-white text-black rounded-lg p-1.5 cursor-pointer hover:bg-zinc-300 transition"
                  />
                ))}
              </div>
            </div>

            {/* Pages */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3">Pages</h2>
              <ul className="space-y-2 text-sm sm:text-base">
                <li>
                  <Link to="/" className="text-zinc-300 hover:text-white">Home</Link>
                </li>
                <li>
                  <Link to="/" className="text-zinc-300 hover:text-white">About</Link>
                </li>
                <li>
                  <Link to="/" className="text-zinc-300 hover:text-white">FAQs</Link>
                </li>
                <li>
                  <Link to="/" className="text-zinc-300 hover:text-white">Contact</Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 ml-4">Categories</h2>
              <div className=" grid grid-cols-2 gap-2">
                <ul className="space-y-2 text-sm sm:text-base">
                  <li>
                    <Link to="/" className="text-zinc-300 hover:text-white">Cloth</Link>
                  </li>
                  <li>
                    <Link to="/" className="text-zinc-300 hover:text-white">Shoes</Link>
                  </li>
                  <li>
                    <Link to="/" className="text-zinc-300 hover:text-white">Jewelery</Link>
                  </li>
                  <li>
                    <Link to="/" className="text-zinc-300 hover:text-white">Electronics</Link>
                  </li>
                     <li>
                    <Link to="/" className="text-zinc-300 hover:text-white">Sports & Outdoors</Link>
                  </li>
                    <li>
                    <Link to="/" className="text-zinc-300 hover:text-white"> Toys & Games</Link>
                  </li>
                </ul>
                <ul className="space-y-2 text-sm sm:text-base">
                  <li>
                    <Link to="/" className="text-zinc-300 hover:text-white">Bags & Accessories</Link>
                  </li>
                  <li>
                    <Link to="/" className="text-zinc-300 hover:text-white">Beauty & Cosmetics</Link>
                  </li>
                  <li>
                    <Link to="/" className="text-zinc-300 hover:text-white">Books & Stationery</Link>
                  </li>
                  <li>
                    <Link to="/" className="text-zinc-300 hover:text-white">Furniture</Link>
                  </li>
                     <li>
                    <Link to="/" className="text-zinc-300 hover:text-white">Home & Kitchen</Link>
                  </li>
                  
                </ul>
              </div>

            </div>

            {/* Contact */}
            <div className='lg:ml-10'>
              <h2 className="text-xl sm:text-2xl font-bold mb-3" >Contact Us</h2>
              <ul className="space-y-1 text-sm sm:text-base text-zinc-300">
                <li>Yemen - Sana’a Al-Tahrir Street</li>
                <li>+967 777 423 769</li>
                <li>+967 733 577 780</li>
                <li>info@alssadi.com</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-pink-900 py-4">
        <div className="container mx-auto px-4">
          <p className="text-center text-zinc-400 text-sm sm:text-base">
            Copyright &copy; 2026 All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
