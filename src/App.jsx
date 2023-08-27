import React from "react";
import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import GcashPayment from "./pages/GcashPayment";
import Success from "./pages/Success";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders"; // Import the Orders component
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/products/:category">
          <ProductList />
        </Route>

        <Route path="/product/:id">
          <Product />
        </Route>

        <Route path="/cart">
          <Cart />
        </Route>

        <Route path="/gcash-payment"> 
          <GcashPayment />
        </Route>

        <Route path="/success">
          <Success />
        </Route>

        <Route path="/wishlist">
          <Wishlist />
        </Route>

        <Route path="/profile">
          {user ? <Profile /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          {user ? <Redirect to="/" /> : <Login />}
        </Route>

        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>

        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>

        <Route path="/reset-password/:token">
          <ResetPassword />
        </Route>

        <Route path="/orders"> {/* New route for the Orders component */}
          <Orders />
        </Route>

      </Switch>
    </Router>
  );
};

export default App;
