const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model("User", UserSchema);

/* REGISTER */
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.json({ message: "User already exists ❌" });

  await new User({ email, password }).save();
  res.json({ message: "User Registered Successfully ✅" });
});

/* LOGIN */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (user) res.json({ message: "Login Successful ✅" });
  else res.json({ message: "Invalid Credentials ❌" });
});

/* PRODUCTS WITH IMAGES */
app.get("/products", (req, res) => {
  res.json([
    { id: 1, name: "Burger", price: 149, category: "Fast Food" },
    { id: 2, name: "Pizza", price: 299, category: "Fast Food" },
    { id: 3, name: "Fries", price: 99, category: "Fast Food" },
    { id: 4, name: "Sandwich", price: 130, category: "Fast Food" },
    { id: 5, name: "Fried Chicken", price: 249, category: "Fast Food" },

    { id: 6, name: "Biryani", price: 220, category: "Indian" },
    { id: 7, name: "Paneer", price: 250, category: "Indian" },
    { id: 8, name: "Dal", price: 180, category: "Indian" },

    { id: 9, name: "Dosa", price: 120, category: "South Indian" },
    { id: 10, name: "Appam", price: 140, category: "South Indian" },

    { id: 11, name: "White Pasta", price: 199, category: "Italian" },
    { id: 12, name: "Red Pasta", price: 189, category: "Italian" },
    { id: 13, name: "Lasagna", price: 259, category: "Italian" },
    { id: 14, name: "Spaghetti", price: 210, category: "Italian" },
    { id: 15, name: "Garlic Bread", price: 120, category: "Italian" },

    { id: 16, name: "Ice Cream", price: 99, category: "Dessert" },
    { id: 17, name: "Cake", price: 150, category: "Dessert" },
    { id: 18, name: "Brown Cake", price: 170, category: "Dessert" },
    { id: 19, name: "Donut", price: 80, category: "Dessert" },
    { id: 20, name: "Jamun", price: 90, category: "Dessert" }
  ]);
});                  

app.listen(5000, () => console.log("Server running on 5000"));