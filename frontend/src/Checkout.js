import { useNavigate } from "react-router-dom";

function Checkout({ cart }) {
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="checkout-page">
      <div className="checkout-box">
        <h2>Checkout</h2>

        {/* ORDER SUMMARY */}
        <div>
          <h4>Your Order:</h4>
          {cart.map((item, index) => (
            <p key={index}>
              {item.name} - ₹{item.price}
            </p>
          ))}

          <h3>Total: ₹{total}</h3>
        </div>

        {/* FORM */}
        <input placeholder="Name" />
        <input placeholder="Address" />
        <input placeholder="Phone" />

        <button onClick={() => navigate("/success")}>
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;