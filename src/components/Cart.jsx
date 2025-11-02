import React from "react";
import { Sidebar } from "primereact/sidebar";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ShoppingBasket, ShoppingBagIcon, ShoppingBasketIcon } from "lucide-react";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "../features/cart/cartSlice";
import Divider from '@mui/material/Divider';

function Cart({ visible, setvisible }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);


  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Sidebar
      visible={visible}
      position="right"
      onHide={() => setvisible(false)}
      className=" bg-pink-50 backdrop-blur-lg  pt-5 px-4  mt-5 rounded-md  relative  "
      showCloseIcon={true}
      style={{
        width: "430px",

        padding: "1.5rem",
        overflowY: "auto",
      }}

    >

      {/* 🧾 الهيدر */}
      <div className="flex justify-between items-center  mb-2">
        <h2 className="text-3xl font-bold text-pink-800 flex items-center gap-2 mx-4">
          <ShoppingBag size={40} className="text-pink-600 text-4xl " />  My Cart
          <span className="text-sky-600  mx-5 text-2xl "> [ {cartItems.length} ]</span>
        </h2>

      </div>
      <div className=" mb-4 pt-2">  <Divider variant="praimary " className="text-pink-700  text-xl " /></div>
      {/* 🛍️ محتوى السلة */}
      {cartItems.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-[60vh] text-center">
          <ShoppingBag size={70} className="text-pink-400 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            Your Cart is Empty
          </h3>
          <p className="text-gray-500 mb-6">
            Add some products to your cart to see them here.
          </p>
          <Link
            to="/"
            onClick={() => { setvisible(false) }}

            className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition shadow-md"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          {/* 🧺 المنتجات */}
          <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-pink-300 scrollbar-track-gray-100">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-white rounded-md p-3 shadow hover:shadow-sm transition"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 md:h-20 object-contain rounded-md border border-pink-100"
                />
                <div className="flex-1">
                  <h3 className="text-xs  md:text-sm font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-pink-700 font-medium text-xs  md:text-sm " >
                    ${item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => dispatch(decreaseQty(item.id))}
                      className="bg-pink-100 text-pink-600 hover:bg-pink-200 p-1 rounded-full transition"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-medium">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(increaseQty(item.id))}
                      className="bg-pink-100 text-pink-600 hover:bg-pink-200 p-1 rounded-full transition"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800 text-xs  md:text-lg">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-red-500 hover:text-red-600 mt-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 💳 ملخص الطلب */}
          <div className="bg-pink-50 shadow-md rounded-xl mx-auto mt-5  absolute bottom-0 mb-7 right-1 left-2 ">

            <div className="flex justify-around font-semibold text-lg  pt-3 px-5 mx-4">
              <span>Total</span>
              <span className="text-pink-600">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-center gap-4 items-center px-4 my-4 mb-5">
             <button className="  text-pink-500 md:py-3 md:px-4 outline outline-1 outline-pink-700 rounded-lg font-semibold hover:bg-pink-600 hover:text-white transition text-sm py-2 px-2">
             ← Continue Shopping
            </button>
                <Link
              to="/"
              onClick={() => setvisible(false)}
             
            >
             
               <button className=" md:px-5 bg-green-600 text-white  md:py-3 rounded-lg font-semibold hover:bg-pink-600 transition text-sm py-2 px-2">
                Checkout
              </button>
             
            </Link>
            </div>


           
          
          </div>
        </>
      )}
    </Sidebar>
  );
}

export default Cart;
