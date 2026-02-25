import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./App.css";

// IMAGES
import burger from "./Images/burger.jpg";
import pizza from "./Images/pizza.jpg";
import fries from "./Images/fries.jpg";
import sandwich from "./Images/sandwich.jpg";
import friedchicken from "./Images/friedchicken.jpg";
import biryani from "./Images/biryani.jpg";
import paneer from "./Images/paneer.jpg";
import dal from "./Images/dal.jpg";
import dosa from "./Images/dosa.jpg";
import appam from "./Images/appam.jpg";
import pasta from "./Images/pasta.jpg";
import redpasta from "./Images/redpasta.jpg";
import lasagna from "./Images/lasagna.jpg";
import spaghetti from "./Images/spaghetti.jpg";
import garlicbread from "./Images/garlicbread.jpg";
import ice from "./Images/ice.jpg";
import cake from "./Images/cake.jpg";
import bcake from "./Images/bcake.jpg";
import donut from "./Images/donut.jpg";
import jamun from "./Images/jamun.jpg";

function Menu({ addToCart }) {

  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const searchItem = query.get("search") || "";

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + "/products")
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // IMAGE FUNCTION ✅ (INSIDE component)
  const getImage = (name) => {
    switch (name) {
      case "Burger": return burger;
      case "Pizza": return pizza;
      case "Fries": return fries;
      case "Sandwich": return sandwich;
      case "Fried Chicken": return friedchicken;
      case "Biryani": return biryani;
      case "Paneer": return paneer;
      case "Dal": return dal;
      case "Dosa": return dosa;
      case "Appam": return appam;
      case "White Pasta": return pasta;
      case "Red Pasta": return redpasta;
      case "Lasagna": return lasagna;
      case "Spaghetti": return spaghetti;
      case "Garlic Bread": return garlicbread;
      case "Ice Cream": return ice;
      case "Cake": return cake;
      case "Brown Cake": return bcake;
      case "Donut": return donut;
      default: return jamun;
    }
  };

  // FILTER
  const filteredItems = items.filter((item) => {
    const matchCategory =
      category === "All" || item.category === category;

    const matchSearch =
      item.name.toLowerCase().includes(searchItem.toLowerCase());

    return matchCategory && matchSearch;
  });

  // LOADING
  if (loading) return <h2>Loading...</h2>;

  return (
    <>
      {/* TOP BAR */}
      <div className="top-bar">
        <h2>Menu</h2>
        <button className="cart-btn" onClick={() => navigate("/cart")}>
          🛒
        </button>
      </div>

      {/* CATEGORY */}
      <div className="category-bar">
        <button onClick={() => setCategory("All")}>All</button>
        <button onClick={() => setCategory("Fast Food")}>Fast Food</button>
        <button onClick={() => setCategory("Indian")}>Indian</button>
        <button onClick={() => setCategory("South Indian")}>South Indian</button>
        <button onClick={() => setCategory("Italian")}>Italian</button>
        <button onClick={() => setCategory("Dessert")}>Dessert</button>
      </div>

      {/* PRODUCTS */}
      <div className="food-container">
        {filteredItems.length === 0 ? (
          <h3 style={{ textAlign: "center" }}>No items found 😢</h3>
        ) : (
          filteredItems.map((item, index) => (
            <div className="food-card" key={index}>
              <img src={getImage(item.name)} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.category}</p>
              <h4>₹{item.price}</h4>

              <button onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Menu;