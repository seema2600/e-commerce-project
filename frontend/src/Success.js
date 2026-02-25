import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Success() {
  const navigate = useNavigate();

  const orderId = Math.floor(Math.random() * 100000);

  return (
    <div className="success-page">
      <div className="success-box">

        <h1>🎉 Order Placed!</h1>

        {/* ✅ ADD HERE */}
        <h2>Your food is on the way 🚀</h2>
        <p>Estimated delivery: 30 mins</p>
        <p>Order ID: #{orderId}</p>

        <button onClick={() => navigate("/")}>
          Back to Home
        </button>

      </div>
    </div>
  );
}

export default Success;