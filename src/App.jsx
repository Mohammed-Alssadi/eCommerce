import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import CartPage from './pages/CartPage'
import ProductByCategory from './pages/ProductByCategory'
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import SearchResultsPage from './pages/SearchResultsPage';
import { Provider } from 'react-redux'
import { store } from './App/Store'
import AllProducts from './pages/AllProducts'
import ScrollManager from "./components/ScrollManager";
import AllCategories from './pages/AllCategories'
import NotFound from './pages/NotFound'
import './index.css'

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollManager /> 
        
        <Navbar />
        <div className="container mx-auto min-h-[70vh]">
        {/* <div className="h-[110px] md:h-[90px]"></div> */}
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<AllProducts/>}/>
          {/* <Route path="/cart" element={<CartPage />} /> */}
          <Route path="/category/:slug" element={<ProductByCategory />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/categories" element={<AllCategories/>} />
          <Route path="*" element={<NotFound />} />
        
        </Routes>
          </div>
        <Footer />
      
      </BrowserRouter>
    </Provider>
  )

}

export default App
