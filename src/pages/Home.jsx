import React from 'react'
import ProductCard from '../components/ProductCard';
import DiscountedProducts from '../components/DiscountedProducts';
import Footer from '../components/Footer';
import CategoryCard from '../components/CategoryCard';
import BestSelling from '../components/BestSelling';
import HeroBaner from '../components/HeroBaner';
import ForYouSection from '../components/ForYouSection';
import Delivery from '../components/Delivery';
import TopCategories from '../components/TopCategories';
import Cart from '../components/Cart';

// import { useDispatch } from 'react-redux';
// import { setSelectedCategory } from '../features/products/productSlice';
function Home() {


  return (
    <div className='container mx-auto px-5'>
     <HeroBaner/>

       
        <div id="categories" className=" mt-8 pt-8 ">
       
         <TopCategories />
        </div>
        {/* <div className='flex gap-4 itmes-center justify-center flex-wrap' >
  {categories.map((item,index) => 
  
  <button key={index}
  onClick={()=>dispatch(setSelectedCategory(item))}
   className='bg-gray-300 py-2 px-6 rounded-md text-black active:scale-105 hover:bg-zinc-400 transition-all ease-in '>{item}</button> )}
</div> */}
        <section id="products">
          
          <ForYouSection />
          <DiscountedProducts/>
          <BestSelling />
          <Delivery/>
        </section>
       
      </div>


  );
}

export default Home;