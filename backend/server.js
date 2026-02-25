const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

/* ===== MIDDLEWARE ===== */
app.use(cors());
app.use(express.json());

/* ===== ROOT ROUTE (IMPORTANT FOR DEPLOYMENT) ===== */
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

/* ===== DATABASE CONNECTION ===== */
// ⚠️ Replace this with MongoDB Atlas URL when deploying
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ecommerce";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

/* ===== USER SCHEMA ===== */
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

/* ===== REGISTER ===== */
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.json({ message: "User already exists ❌" });

    await new User({ email, password }).save();

    res.json({ message: "User Registered Successfully ✅" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user ❌" });
  }
});

/* ===== LOGIN ===== */
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (user)
      res.json({ message: "Login Successful ✅" });
    else res.json({ message: "Invalid Credentials ❌" });
  } catch (err) {
    res.status(500).json({ message: "Login error ❌" });
  }
});

/* ===== PRODUCTS ===== */
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
    { id: 20, name: "Jamun", price: 90, category: "Dessert" },
  ]);
});

/* ===== PORT FIX (VERY IMPORTANT) ===== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on ${PORT} 🚀`)
);