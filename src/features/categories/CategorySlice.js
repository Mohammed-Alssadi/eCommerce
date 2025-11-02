import { createSlice } from "@reduxjs/toolkit";
import categories from "/src/services/categoriesData";

const initialState = {
    items: categories,
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
});

export default categorySlice.reducer;