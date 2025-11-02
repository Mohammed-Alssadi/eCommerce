// features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
  // 🔹 تحميل البيانات من localStorage عند بدء التشغيل
const savedCart = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : []; 
// الحالة الابتدائية (تخزن العناصر داخل السلة)
const initialState = {
  items: savedCart,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 🛒 إضافة منتج إلى السلة
    addToCart: (state, action) => {
      // نتحقق إذا المنتج موجود بالفعل
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        // إذا موجود نزيد الكمية
        existingItem.quantity++;
      } else {
        // إذا مش موجود نضيفه بقيمة quantity = 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
       localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    // ❌ حذف منتج من السلة
    removeFromCart: (state, action) => {
      // نحذف العنصر الذي يطابق الـ id المرسل
      state.items = state.items.filter((item) => item.id !== action.payload);
       localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    // 🔢 تحديث كمية منتج مباشرة (اختياري)
    updateQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
       localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    // ➕ زيادة الكمية بمقدار 1
    increaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity++;
      }
       localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    // ➖ تقليل الكمية بمقدار 1 (مع حذف المنتج إذا وصلت 0)
    decreaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
      } else {
        // نحذفه تمامًا لو وصلت الكمية إلى صفر
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
       localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
       // 🧹 لتفريغ السلة بالكامل (مثلاً بعد الدفع)
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
  },
});

// ✅ تحديث السلة عند بدء التشغيل


// ✅ تصدير الأكشنات لاستخدامها في الواجهة (مثل CartPage)
export const {
  
  addToCart,
  removeFromCart,
  updateQuantity,
  increaseQty,
  decreaseQty,
} = cartSlice.actions;

// ✅ تصدير الريدويسر لتسجيله داخل store.js
export default cartSlice.reducer;
