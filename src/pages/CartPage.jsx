import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
// جلب الكشن من السلايس
import { removeFromCart, increaseQty, decreaseQty } from "../features/cart/cartSlice";

function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  // حساب الاجمالي
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // اذا مسله  فاضي  يرجع عدم وجود منتحات 
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-20 min-h-[70vh] text-center">
        <ShoppingBag size={80} className="mx-auto mb-4 text-pink-400" />
        <h2 className="text-3xl font-bold mb-3 text-gray-800">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-6">Add some products to your cart to see them here</p>
        <Link
          to="/"
          className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition-all duration-300 shadow-md"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-[80vh]">
      <h2 className="text-3xl font-bold text-gray-800 mb-10"> Shopping Cart</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* 🧺 قائمة المنتجات */}
        <div className="lg:col-span-2 space-y-6">
          {/* مابينق للعناصر */}
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-6 bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-28 h-28 object-contain rounded-xl border border-pink-100"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                {/* تحويل فاصله بين رقمسن */}
                <p className="text-pink-600 font-bold mt-1">${item.price.toFixed(2)}</p>

                <div className="flex items-center mt-3 gap-3">
                  <button 
                  // لما  اعمل مينس يروح يزي الكميه  ويتحقق من الايدي اذا قد العنر موجود ينقص كميته
                    onClick={() => dispatch(decreaseQty(item.id))}
                    className="bg-pink-100 text-pink-600 hover:bg-pink-200 p-2 rounded-full transition"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-gray-800 font-medium">{item.quantity}</span>
                  <button
                  // ينقص من الكميه
                    onClick={() => dispatch(increaseQty(item.id))}
                    className="bg-pink-100 text-pink-600 hover:bg-pink-200 p-2 rounded-full transition"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-lg font-semibold text-gray-900">
                  {/* حساب الاجمالي لنفس المنتج */}
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <button 
                // حذف المنتج من السله 
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500 hover:text-red-600 mt-3 transition"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 💳 ملخص الطلب */}
        <div className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-10">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">Order Summary</h3>

          <div className="space-y-3 text-gray-700 mb-6">
            <div className="flex justify-between">
              {/* الاجمالي الفرعي */}
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <div className="border-t pt-3 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-pink-600">${total.toFixed(2)}</span>
            </div>
          </div>

          <button className="w-full bg-pink-500 text-white py-3 rounded-full font-semibold hover:bg-pink-600 transition-all duration-300 shadow-md">
            Proceed to Checkout
          </button>

          <Link
            to="/"
            className="block text-center text-pink-600 hover:text-pink-700 mt-4 font-medium transition"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
