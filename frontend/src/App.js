import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Menu from "./Menu";
import Login from "./Login";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Navbar from "./Navbar";
import "./App.css";
import Success from "./Success";

function App() {
  const [cart, setCart] = useState([]);

  // ✅ ADD
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  // ✅ REMOVE
  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  return (
<Router>
  <Navbar cart={cart} />

  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/menu" element={<Menu addToCart={addToCart} />} />
    <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
    <Route path="/checkout" element={<Checkout cart={cart} />} />
    <Route path="/login" element={<Login />} />
    <Route path="/success" element={<Success />} />
  </Routes>
</Router>
  );
}

export default App;