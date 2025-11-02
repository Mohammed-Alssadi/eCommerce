import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { Link } from "react-router-dom";
import { ArrowRightFromLine } from "lucide-react";
import '../index.css';
function BestSelling() {
  const products = useSelector((state) => state.product.items);
  const [bestSelling, setBestSelling] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🧠 فرز المنتجات حسب الأكثر مبيعاً
  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      const sorted = [...products]
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10);
      setBestSelling(sorted);

      // ⏳ محاكاة التحميل
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [products]);

  return (
    <div className="mt-1">
      {/* 🔹 العنوان والرابط */}
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-center text-2xl md:text-4xl font-semibold text-gray-900 md:text-start md:pt-8 md:mb-4">
          Best Selling
        </p>
        <Link
          to="/products"
          className="text-gray-400 hover:text-gray-500 font-medium text-lg md:pt-6 md:mt-8 py-4 md:mr-6 pr-5 flex items-center"
        >
          See All
          <ArrowRightFromLine className="ml-3 text-2xl text-pink-600" />
        </Link>
      </div>

      {/* ⏳ أثناء التحميل */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        bestSelling.length > 0 && (
          <div className=" px-2">
            {/* 🌀 سلايدر Swiper */}
            <Swiper
              modules={[Navigation, Autoplay, Pagination]} // تفعيل الأسهم والتشغيل التلقائي
              spaceBetween={20} // المسافة بين البطاقات
              slidesPerView={4}
               // عدد البطاقات الافتراضي على الشاشات الكبيرة
            
              pagination={{ clickable: true }}
               // عرض الأسهم
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop={true} // يجعل السلايدر دائري
              grabCursor={true} // يجعل المؤشر بشكل اليد عند السحب
              breakpoints={{
                1400: { slidesPerView: 5 },
                1200: { slidesPerView: 4 },
                992: { slidesPerView: 3 },
                768: { slidesPerView: 2 },
                0: { slidesPerView: 1 },
              }}
              className="pb-2 mb-8 p overflow-hidden"
            >
              {/* 🧱 بطاقات المنتجات */}
              {bestSelling.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className="px-1 mb-12 mx-">
                    <ProductCard product={product} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )
      )}
    </div>
  );
}

export default BestSelling;
