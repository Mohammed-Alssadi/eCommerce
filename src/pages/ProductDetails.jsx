import { BugPlay, CreditCard, ShoppingCart, Star } from "lucide-react";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { Galleria } from "primereact/galleria";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.product.items.find((p) => p.id === parseInt(id))
  );

  const [images] = useState(
    product
      ? [
        { itemImageSrc: product.image, thumbnailImageSrc: product.image, alt: product.title },
        { itemImageSrc: product.image, thumbnailImageSrc: product.image, alt: product.title },
        { itemImageSrc: product.image, thumbnailImageSrc: product.image, alt: product.title },
      ]
      : []
  );

  const responsiveOptions = [
    { breakpoint: "1024px", numVisible: 2 },
    { breakpoint: "768px", numVisible: 2 },
    { breakpoint: "560px", numVisible: 2 },
  ];

  const itemTemplate = (item) => (
    <div className=" rounded-2xl p bg-white">
      <img
        src={item.itemImageSrc}
        alt={item.alt}
        className=" h-[400px] object-contain transition-transform duration-1000 ease-in-out transform hover:scale-150 cursor-zoom-in"
      />
    </div>
  );

  const thumbnailTemplate = (item) => (
    <div className="overflow-hidden rounded-xl  p-4">
      <img
        src={item.thumbnailImageSrc}
        alt={item.alt}
        className=" w-[100px] h-[100px]  my-1 pt-0 object-contain transition-transform duration-300 hover:scale-110 cursor-pointer"
      />
    </div>
  );

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-semibold mb-4 text-gray-700">
          Product Not Found!
        </h2>
        <Link
          to="/"
          className="text-pink-600 hover:text-pink-800 font-medium underline"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-5 min-h-[80vh]">
      <Link
        to="/#products"
        className="text-pink-600 hover:text-pink-800 inline-block font-medium mb-6"
      >
        ← Back To Products
      </Link>

      {/* الشبكة الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-2  gap-[-2rem] lg:gap-8">
        {/* العمود الأول: الصور */}
        <div className="flex flex-col items-center  rounded px-5  pb-0  lg:pb-12 overflow-hidden border-b">
          <Galleria
            value={images}
            responsiveOptions={responsiveOptions}
            numVisible={2}
            showIndicators={false}
            showItemNavigators={false}
            circular
            item={itemTemplate}
            thumbnail={thumbnailTemplate}
            style={{ maxWidth: "400px" }}
          />
        </div>

        {/* العمود الثاني: التفاصيل */}
        <div className="flex flex-col justify-center items-center pl-6    md:justify-around  lg:items-start   mt-2 md:mt-3 md:pt-3  ">
          <div>
            <h1 className=" lg:text-3xl text-xl md:text-4xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>

            {/* التقييم */}
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  fill={i < Math.floor(product.rating || 0) ? "#f472b6" : "none"}
                  className={i < Math.floor(product.rating || 0) ? "text-pink-400" : "text-gray-300"}
                />
              ))}
              <span className="text-gray-500 text-sm ml-2">
                ({product.rating || 0})
              </span>
            </div>

            {/* السعر */}
            <div className="mb-5 ">
              {product.oldPrice && product.oldPrice > product.price ? (
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-pink-600">
                    ${product.price}
                  </span>
                  <span className="text-gray-400 line-through text-lg">
                    ${product.oldPrice}
                  </span>
                  <span className="bg-pink-200 text-pink-800 px-3 py-1 rounded-full text-sm font-semibold">
                    -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-pink-600">
                  ${product.price}
                </span>
              )}
            </div>

            {/* الوصف */}
            <p className="text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* التصنيف والمبيعات */}
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-10 gap-6  mb-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Category
                </h3>
                <span className="inline-block bg-pink-100 text-pink-800 rounded-full px-3 py-1 mt-1 text-sm font-medium">
                  {product.category}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Sold
                </h3>
                <span className="inline-block bg-red-100 text-green-800 rounded-full px-3 py-1 mt-1 text-sm font-medium">
                  {product.sold} units
                </span>
                
              </div>

                <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Available
                </h3>
                <span className="inline-block bg-green-100 text-green-800 rounded-full px-3 py-1 mt-1 text-sm font-medium">
                  {product.quntity>0?"Available":"Not Available"} 
                </span>
                
              </div>
                 <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Size
                </h3>
                <span className="inline-block bg-pink-100 text-green-800 rounded-full px-3 py-1 mt-1 text-sm font-medium">
                  {product.size} 
                </span>
                
              </div>
                 <div className="">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Color
                </h3>
                <span className="inline-block bg-pink-100 text-green-800 rounded-full px-3 py-1 mt-1 text-sm font-medium">
                  {product.color[0]}  | {product.color[1]} | {product.color[2]} 
                </span>
                
              </div>

            </div>
          </div>

          {/* زر الإضافة للسلة */}
          <div className="flex   flex-col  md:flex-row items-center justify-between gap-4  pb-5">
            <button
              onClick={() => dispatch(addToCart(product))}
              className="flex items-center justify-center  gap-2 bg-pink-500 text-white rounded-[15px] px-6 py-3 font-semibold hover:bg-pink-600 active:scale-95 transition-all duration-200 shadow-lg"
            >
              <ShoppingCart size={22} />
              Add to Cart
            </button>
            <button
              onClick={() => dispatch(addToCart(product))}
              className="  flex items-center justify-center  outline-1 outline  gap-2  text-pink-600 rounded-[17px] px-7 py-3 font-semibold hover:bg-pink-500  hover:text-white  active:scale-95 transition-all duration-200 "
            >
              <CreditCard size={22} />
              Buy Now
            </button>
          </div>

        </div>
{/* 
   عن المنتج */}

    
      </div>
        <div className="container  mx-auto  border-t">
          <div className="    text-gray-700 leading-relaxed  p-6">
          <h2 className=" text-xl lg:text-2xl font-bold text-pink-700 mb-4 ">
            About This Product
          </h2>
          <p>
            {product.about}
          </p>
         
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
