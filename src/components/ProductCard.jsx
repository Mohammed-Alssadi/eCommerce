import React from "react";
import { Link } from "react-router-dom";
import { Star, Lock, ShoppingCart } from "lucide-react";
import { ShoppingBag } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { Eye } from "lucide-react";
import DiscountBadge from "./DiscountBadge";
function ProductCard({ product }) {
  const { id, title, image, price, oldPrice, sold, rating } = product;
  const dispatch = useDispatch();
  // const product = useSelector((state) =>
  //   state.product.items.find((p) => p.id === parseInt(id))
  // );
  return (
    <div className="border-2 rounded-xl shadow-sm hover:shadow-lg  hover:border-red-300 transition-all duration-300 bg-white ">
      {/* صورة المنتج */}
     
      <div className="relative">
        <DiscountBadge oldPrice={oldPrice} price={price} />
        <img
          src={image}
          alt={title}
          className="w-full h-52 object-contain p-3 transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* تفاصيل المنتج */}
      <div className="px-4 pb-2 pt-0">
        <h2 className="text-lg font-medium text-gray-800 truncate ">
          {title}
        </h2>

        <div className="mt-2 flex items-center gap-5">
          <p className="text-lg font-semibold text-red-600">
            ${price.toFixed(2)}
          </p>
          {oldPrice && (
            <p className="text-md text-gray-500 line-through">${oldPrice}</p>
          )}
        </div>

        {/* تقييم ومبيعات */}
        <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-500" />
            <span>{rating} (0)</span>
          </div>
          <p>{sold} Sold</p>
        </div>

        {/* زر الشراء */}
        <div className=" flex justify-between items-center mx-1 gap-2">
          <ShoppingCart size={40}
            onClick={() => dispatch(addToCart(product))}
            className=" border rounded-lg py-2 text-pink-400 mt-3 border-pink-200 hover:bg-pink-50 hover:cursor-pointer" />
          <Link to={`/product/${id}`}>
          <Eye
            size={40}
            className="border border-pink-200 hover:border-pink-300 rounded-lg p-2 text-pink-500  hover:bg-pink-100 mt-3 transition-all"
          />
           </Link>
          <button className="w-[60%] border border-pink-400 text-pink-500 rounded-lg py-1.5 mt-3 flex items-center justify-center gap-2 hover:bg-pink-50 transition-all">
            <Lock size={16} />
            Buy Now
          </button>

        </div>

      </div>
   
    </div>
  );
}

export default ProductCard;
