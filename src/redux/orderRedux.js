import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    loading: false,
    error: null,
    orderDetails: null,
  },
  reducers: {
    createOrderStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createOrderSuccess: (state, action) => {
      state.loading = false;
      state.orders.push(action.payload);
    },
    createOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getOrderStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getOrderSuccess: (state, action) => {
      state.loading = false;
      state.orderDetails = action.payload;
    },
    getOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    cancelOrderStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    cancelOrderSuccess: (state, action) => {
      state.loading = false;
      // Update the order status to "Canceled" in the orders array
      state.orders = state.orders.map((order) =>
        order._id === action.payload._id ? { ...order, status: "Canceled" } : order
      );
    },
    cancelOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createOrderStart,
  createOrderSuccess,
  createOrderFailure,
  getOrderStart,
  getOrderSuccess,
  getOrderFailure,
  cancelOrderStart,
  cancelOrderSuccess,
  cancelOrderFailure,
} = orderSlice.actions;

export default orderSlice.reducer;
