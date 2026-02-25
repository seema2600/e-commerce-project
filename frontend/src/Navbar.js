import { Link } from "react-router-dom";
import "./App.css";

function Navbar({ cart }) {
  return (
    <div className="navbar">
      <h2>🍔 Foodie</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/login">Login</Link>
        <Link to="/cart">
          Cart ({cart.length})
        </Link>
      </div>
    </div>
  );
}

export default Navbar;