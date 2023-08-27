import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishlist: [],
  length: 0,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      state.wishlist.push(action.payload);
      state.length = state.wishlist.length;
    },
    removeFromWishlist: (state, action) => {
      const index = state.wishlist.findIndex((product) => product._id === action.payload._id);
      if (index !== -1) {
        state.wishlist.splice(index, 1);
        state.length = state.wishlist.length;
      }
    },
    clearWishlist: (state) => {
      state.wishlist = [];
      state.length = 0;
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
