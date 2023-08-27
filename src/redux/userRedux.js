import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    forgotPasswordSuccess: false,
    cart: null, // Add the cart field to store the user's cart
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
      state.cart = action.payload.cart; // Set the cart field with the user's cart
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    registerStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
      state.cart = action.payload.cart; // Set the cart field with the user's cart
    },
    registerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    forgotPasswordStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.forgotPasswordSuccess = false;
    },
    forgotPasswordSuccess: (state) => {
      state.isFetching = false;
      state.error = false;
      state.forgotPasswordSuccess = true;
    },
    forgotPasswordFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.forgotPasswordSuccess = false;
    },
    changePasswordStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    changePasswordSuccess: (state) => {
      state.isFetching = false;
      state.error = false;
    },
    changePasswordFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      Object.assign(state, {
        currentUser: null,
        isFetching: false,
        error: false,
        cart: null, // Reset the cart field to null on logout
      });
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  changePasswordStart,
  changePasswordSuccess,
  changePasswordFailure,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
