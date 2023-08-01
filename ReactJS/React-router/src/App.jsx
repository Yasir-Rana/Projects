import React from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from "./Home";
import Products from "./Products";
import Navigation from "./Navigation";
import ProductDetails from "./ProductDetails";

const App = () => {
  return (
    <>
    <Navigation  />
    <Switch>
      <Route path="/" exact> <Redirect to="/home" /> </Route>
      <Route path="/home"> <Home  /> </Route>
      <Route path="/products" exact> <Products  /> </Route>
      <Route path="/products/:product"> <ProductDetails  /> </Route>
      </Switch>
    </>
  )
};

export default App;
