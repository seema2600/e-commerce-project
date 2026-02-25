import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = () => {
    if (form.email && form.password) {
      alert("Login Successful ✅");
      navigate("/");
    } else {
      alert("Enter all details ❌");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">   {/* ✅ THIS WAS MISSING */}

        <h2>Login 🔐</h2>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button onClick={handleLogin}>Login</button>

      </div>
    </div>
  );
}

export default Login;