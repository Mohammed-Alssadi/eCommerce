import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/cart/CartSlice";
import categoryReducer from "../features/categories/CategorySlice";
export const store = configureStore({
   reducer: {
    cart: cartReducer,
       product: productReducer,
       category: categoryReducer,
   } 
})