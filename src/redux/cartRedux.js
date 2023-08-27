import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += action.payload.quantity;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    increaseProduct: (state, action) => {
      const { productId, quantity } = action.payload;
      const product = state.products.find((item) => item._id === productId);

      if (product) {
        product.quantity += quantity;
        state.quantity += quantity;
        state.total += product.price * quantity;
      }
    },

    decreaseProduct: (state, action) => {
      const { productId, quantity } = action.payload;
      const product = state.products.find((item) => item._id === productId);

      if (product) {
        const newQuantity = Math.min(quantity, product.quantity);
        product.quantity -= newQuantity;
        state.quantity -= newQuantity;
        state.total -= product.price * newQuantity;

        if (product.quantity === 0) {
          const productIndex = state.products.findIndex((item) => item._id === productId);
          if (productIndex !== -1) {
            state.products.splice(productIndex, 1);
          }
        }
      }
    },
    removeProduct: (state, action) => {
      const { productId } = action.payload;
      const productIndex = state.products.findIndex((item) => item._id === productId);

      if (productIndex !== -1) {
        const product = state.products[productIndex];
        state.quantity -= product.quantity;
        state.total -= product.price * product.quantity;
        state.products.splice(productIndex, 1);
      }
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, increaseProduct, decreaseProduct, removeProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
