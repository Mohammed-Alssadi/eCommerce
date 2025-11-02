import { Filter, Search } from "lucide-react";
import products from "/src/services/productsData";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: products,
    // filteredItems: products,
   searchTerm: "",
   selectedCategory:"All",
  //  bestSellers:[],
  
}
const filtreProducts = (state) =>{
return state.items.filter((product) => {
  const matchSearch = product.title
    .toLowerCase()
    .includes(state.searchTerm.toLowerCase());
    const matchCategory =  state.selectedCategory === "All"|| product.category === state.selectedCategory
  return matchSearch && matchCategory;
});
}


const productSlice =createSlice({
   name: "product",
    initialState,
    reducers:{
setSearchTerm: (state, action) => {
  state.searchTerm = action.payload;
  // state.filteredItems = filtreProducts(state);
},
setSelectedCategory: (state, action) => { //action.payload est la categorie selecte
  state.selectedCategory = action.payload;
  state.filteredItems = filtreProducts(state);
},
// setBestSellers: (state, action) => { //action.payload est la categorie selecte
//   state.bestSellers = action.payload; 
//     },
    }
})
export const {setSearchTerm, setSelectedCategory} = productSlice.actions;
export default productSlice.reducer