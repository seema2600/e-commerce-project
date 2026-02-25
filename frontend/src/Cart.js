import React from "react";
import { useNavigate } from "react-router-dom";

function Cart({ cart, removeFromCart }) {
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-page">
      <div className="cart-box">
        <h2>🛒 Your Cart</h2>

        {cart.length === 0 ? (
          <p>No items added</p>
        ) : (
          cart.map((item, index) => (
            <div className="cart-item" key={index}>
              <span>{item.name}</span>
              <span>₹{item.price}</span>
              <button onClick={() => removeFromCart(index)}>❌</button>
            </div>
          ))
        )}

        <h3>Total: ₹{total}</h3>

        <button
          onClick={() => {
            if (cart.length === 0) {
              alert("Cart is empty ❌");
            } else {
              navigate("/checkout");
            }
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;