import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CategoryCard from './CategoryCard';
import CategoryCardSkeleton from './CategoryCardSkeleton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { ArrowRightFromLine } from 'lucide-react';

function TopCategories() {
  const categories = useSelector((state) => state.category.items).slice(0, 7);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <CategoryCardSkeleton key={i} />
          ))}
        </div>
      ) : categories.length > 0 ? (
        <div className="mt-2 mx-0">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <p className="text-center text-2xl md:text-4xl font-semibold text-black-900 md:text-start">
              Top Categories
            </p>
            <Link
              to="/categories"
              className="text-gray-400 hover:text-gray-500 font-medium text-lg flex items-center"
            >
              See All
              <ArrowRightFromLine className="ml-3 text-2xl text-pink-600" />
            </Link>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={6}
          
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            grabCursor={true}
            breakpoints={{
              1400: { slidesPerView: 6 },
              1200: { slidesPerView: 5 },
              992: { slidesPerView: 4 },
              768: { slidesPerView: 3 },
              575: { slidesPerView: 2 },
              0: { slidesPerView: 1 },
            }}
            className="pb-2 mb-8 px-4 overflow-hidden"
          >
            {categories.map((category) => (
              <SwiperSlide key={category.id}>
                <div className="px-1 pb-8 mb-4">
                  <CategoryCard category={category} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">No categories available.</p>
      )}
    </>
  );
}

export default TopCategories;
