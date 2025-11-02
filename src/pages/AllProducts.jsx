// AllProducts.jsx
import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { Filter } from "lucide-react";
import SlidbarFilter from "../components/SlidbarFilter";
import ReactPaginate from "react-paginate";
import { useMediaQuery } from "@mui/material";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
function AllProducts() {
  const products = useSelector((state) => state.product.items);
  const categories = useSelector(state => state.category.items);
  //  حاله المنتجات في الصفحه
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  // الحد الأقصى للسعر حسب جميع المنتجات
  const maxPrice = Math.max(...products.map(p => p.price), 1000);

  // التحكم في Sidebar
  const [visible, setVisible] = useState(false);

  // القيم الحالية
  const [filters, setFilters] = useState({
    rating: null,
    sort: "default",
    price: [0, maxPrice],
    category: "",
  });


  // القيم المطبقة بعد الضغط على Apply
  const [appliedFilters, setAppliedFilters] = useState(filters);

  // حالة التحميل
  const [loading, setLoading] = useState(false);

  // تطبيق الفلترة مع تأخير 5 ثواني
  const handleApplyFilters = () => {
    setVisible(false);
    setLoading(true);
    setCurrentPage(0);
    setTimeout(() => {
      setAppliedFilters(filters);
      setLoading(false);
    }, 1000);

  };

  // إعادة التصفير
  const handleResetFilters = () => {
    const reset = {
      rating: null,
      sort: "default",
      price: [0, maxPrice],
      category: "",
    };
    setFilters(reset);
    setAppliedFilters(reset);
    setCurrentPage(0);
  };

  // فلترة المنتجات
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // فلترة حسب التقييم
    if (appliedFilters.rating) {
      const min = appliedFilters.rating;
      const max = appliedFilters.rating + 0.9;
      result = result.filter(
        (p) => p.rating >= min && p.rating <= max
      );

    }
    // فلترة حسب السعر
    result = result.filter(
      (p) => p.price >= appliedFilters.price[0] && p.price <= appliedFilters.price[1]
    );

    // فلترة حسب التصنيف
    if (appliedFilters.category) {
      result = result.filter((p) =>
        p.category.toLowerCase().includes(appliedFilters.category.toLowerCase())
      );
    }

    // الترتيب
    if (appliedFilters.sort === "price_low_high") {
      result.sort((a, b) => a.price - b.price);
    } else if (appliedFilters.sort === "price_high_low") {
      result.sort((a, b) => b.price - a.price);
    } else if (appliedFilters.sort === "rating_high_low") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, appliedFilters]);

  // حساب المنتجات التي سيتم عرضها ف الصفحه الواحده
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredProducts.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  // عند تغيير الصفحة
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };


  return (
    <div className="container mx-auto px-4 min-h-[60vh]">
      {/* العنوان وأيقونة الفلترة */}
      <div className="flex justify-between items-center py-3 md:py-4 px-3 md:px-5 rounded-lg bg-zinc-50 shadow-md ">
        <h1 className="  text-lg md:text-3xl font-semibold"> Products</h1>
        <p className="flex items-center  text-md  md:text-lg rounded-xl outline outline-1 px-1 md:px-3 outline-pink-600 cursor-pointer"
          onClick={() => setVisible(true)}>
          filter
          <Filter
            size={isSmallScreen ? 35 : 45}

            className="text-pink-600 py-2 px-1 rounded-lg  hover:text-pink-600 transition"
          />
        </p>
      </div>

      {/* Sidebar الفلترة */}
      <SlidbarFilter
        visible={visible}
        setVisible={setVisible}
        filters={filters}
        setFilters={setFilters}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
        maxPrice={maxPrice}
        categories={categories}
      />

    

      {filteredProducts.length === 0 && (
        <div className="flex justify-center items-center py-5">
          <p className="text-gray-600">No products found</p>
        </div>
      )}

      {/* حالة التحميل */}
      {filteredProducts.length > 0 && loading && (
        <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">{
            Array.from({ length: 5 }).map((_, index) => (
              <ProductCardSkeleton key={index}></ProductCardSkeleton>
            ))
          }
          </div>


        </div>
      )}

      {/* المنتجات */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
          {filteredProducts.length > 0 ? (
            currentItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (null)}

        </div>
      )}
<div className=" flex  justify-between items-center">


<p className="text-gray-600 text-sm md:text-base  mt-8 md:mt-12 md:pt-12 hidden md:inline-block">Showing {currentItems.length} of {products.length} products</p>
      <div className=" flex justify-center items-center   mt-8 md:mt-12 md:pt-12">
          {/* عدد المنتجات */}
     
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"flex space-x-2  md:space-x-2"}
          pageClassName={"px-2 md:px-4 py-2 border rounded hover:bg-pink-500 hover:text-white cursor-pointer"}
          previousClassName={" px-2 md:px-4 py-2 border rounded hover:bg-pink-500 hover:text-white cursor-pointer"}
          nextClassName={" px-2 md:px-4 py-2 border rounded hover:bg-pink-500 hover:text-white cursor-pointer"}
          activeClassName={" bg-pink-500 text-white border-pink-500"}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
        />
      </div>
    </div>
    </div>
  );
}

export default AllProducts;
