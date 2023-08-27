  import { updateUserRequest, publicRequest } from "../requestMethods";
  import {
    loginFailure,
    loginStart,
    loginSuccess,
    registerFailure,
    registerStart,
    registerSuccess,
    changePasswordFailure,
    changePasswordStart,
    changePasswordSuccess
  } from "./userRedux";
  import {
    createOrderStart,
    createOrderSuccess,
    createOrderFailure,
    getOrderStart,
    getOrderSuccess,
    getOrderFailure,
    cancelOrderStart,
    cancelOrderSuccess,
    cancelOrderFailure,
  } from "./orderRedux";


  export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
      const res = await publicRequest.post("/auth/login", user);
      dispatch(loginSuccess(res.data));

      // Update user request with new access token
      const { accessToken } = res.data;
      updateUserRequest(accessToken);

      return res.data; // Optionally return the response data
    } catch (err) {
      dispatch(loginFailure(err.response.data.message));
      throw err; // Rethrow the error to handle it in the component
    }
  };

  export const register = async (dispatch, user) => {
    dispatch(registerStart());
    try {
      const res = await publicRequest.post("/auth/register", user);
      dispatch(registerSuccess(res.data));

      // Update user request with new access token
      const { accessToken } = res.data;
      updateUserRequest(accessToken);

      return res.data; // Optionally return the response data
    } catch (err) {
      if (err.response && err.response.status === 409) {
        dispatch(registerFailure("Username already exists. Please choose a different username."));
      } else {
        dispatch(registerFailure("Registration failed. Please try again later."));
      }
      throw err; // Rethrow the error to handle it in the component
    }
  };

  export const changePassword = async (dispatch, userId, currentPassword, newPassword) => {
    dispatch(changePasswordStart());
    try {
      // Make an API request to change the password
      const res = await publicRequest.put(`/auth/change-password/${userId}`, {
        currentPassword,
        newPassword
      });

      // Handle the successful change password response
      dispatch(changePasswordSuccess());
      return res.data; // Optionally return the response data
    } catch (err) {
      dispatch(changePasswordFailure(err.response.data.message));
      throw err; // Rethrow the error to handle it in the component
    }
  };

  export const createOrder = async (dispatch, order) => {
    dispatch(createOrderStart());
    try {
      const res = await publicRequest.post('/orders', order);
      dispatch(createOrderSuccess(res.data));
      return res.data;
    } catch (err) {
      dispatch(createOrderFailure(err.response.data.message));
      throw err;
    }
  };

  export const getOrder = async (dispatch, userId) => {
    dispatch(getOrderStart());
    try {
      const response = await publicRequest.get(`/orders/find/${userId}`);
      dispatch(getOrderSuccess(response.data));
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      dispatch(getOrderFailure(error.response.data.message));
      throw error;
    }
  };

  export const cancelOrder = async (dispatch, orderId) => {
    dispatch(cancelOrderStart());
    try {
      // Make an API request to cancel the order
      const res = await publicRequest.put(`/orders/cancel/${orderId}`);
      dispatch(cancelOrderSuccess(res.data));
      return res.data;
    } catch (err) {
      dispatch(cancelOrderFailure(err.response?.data?.message || "Error canceling order"));
      throw err;
    }
  };