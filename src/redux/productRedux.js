import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    searchResults: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    searchProducts: (state, action) => {
      const searchTerm = action.payload;
      // Perform search logic here and update searchResults in the state
      state.searchResults = state.products.filter((product) => {
        return (
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.desc.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    },
  },
});

export const { setProducts, searchProducts } = productSlice.actions;

export default productSlice.reducer;
