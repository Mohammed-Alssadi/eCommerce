import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import ReactPaginate from "react-paginate";
function ProductByCategory() {
  const { slug } = useParams();
  const categories = useSelector(state => state.category.items);
  const products = useSelector((state) => state.product.items);
  const [loading, setLoading] = useState(true);

  //  حاله المنتجات في الصفحه
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 1;


  useEffect(() => {
    setLoading(true);
    setCurrentPage(0);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);

  }, [])
  const currentCategory = categories.find((category) => category.slug === slug);
  if (!currentCategory) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">404!</h1>
        <p className="text-gray-600">Page Not Found.</p>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
          Return to Home
        </Link>
      </div>
    );
  }
  const filteredProducts = products.filter((product) => product.category === currentCategory.name);

  // حساب المنتجات التي سيتم عرضها ف الصفحه الواحده
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredProducts.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  // عند تغيير الصفحة
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };


  return (
    <>
      <div className="container mx-auto px-4 py-8  min-h-[50vh]:">
        <h1 className="text-4xl font-bold mb-8 pt-4 text-start">
          {currentCategory.name}
        </h1>

        {loading ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : null}

        {filteredProducts.length === 0 ? (
          <>
            <div className=" flex flex-col justify-center">
              <p className="text-center text-gray-500">No products found For {currentCategory.name}</p>
              <Link
                to="/#categories"
                className="text-center text-blue-600 hover:text-blue-800 my-8  font-medium"
              >
                ← Back To Categories
              </Link>
            </div>
          </>
        ) : (
          <>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {!loading && currentItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className=" flex justify-center  mt-8 md:mt-12 md:pt-12">
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"flex space-x-2  md:space-x-2"}
                pageClassName={"px-2 md:px-4 py-2 border rounded hover:bg-pink-500 hover:text-white cursor-pointer"}
                previousClassName={ " px-2 md:px-4 py-2 border rounded hover:bg-pink-500 hover:text-white cursor-pointer"}
                nextClassName={" px-2 md:px-4 py-2 border rounded hover:bg-pink-500 hover:text-white cursor-pointer"}
                activeClassName={" bg-pink-500 text-white border-pink-500"}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
              />
            </div>
          </>


        )}
      </div>
    </>
  )
}

export default ProductByCategory