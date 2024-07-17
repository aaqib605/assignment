import express from "express";
import "dotenv/config";
import bcrypt from "bcrypt";
import cors from "cors";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import connectDB from "./config/db.js";
import ProductData from "./Products.json" with {type: "json"};

// Schema
import User from "./Schema/User.js";
import Product from "./Schema/Product.js";

connectDB();

const app = express();

// Parse json payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// verify jwt
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No access token found" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid access token" });
    }

    req.user = user.id;
    next();
  });
};

// user signup route
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(403)
        .json({ error: "Please enter all the required fields" });
    }

    // encrypt password before saving in the DB
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userName = email.split("@")[0] + nanoid().substring(0, 5);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      userName,
    });

    await user.save();

    // jwt authentication
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res
      .status(200)
      .json({ jwtToken: accessToken, userName: user.userName, name, email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

// user login route
app.post("/login", verifyJWT, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      return res.status(200).json({
        userName: user.userName,
        name: user.name,
        email,
      });
    } else {
      return res.status(403).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

// get products route
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});

    return res.status(200).json({ products: ProductData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

app.listen(8000, () => console.log("Server running on port 8000"));
