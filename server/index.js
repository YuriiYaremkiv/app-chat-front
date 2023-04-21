import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "./models/User.js";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.get("/profile", (req, res) => {
  const token = req.cookies?.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, userData) => {
      if (err) throw err;
      res.json(userData);
    });
  } else {
    res.status(401).json("no token");
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const createdUser = await User.create({ username, password });
    jwt.sign(
      { userId: createdUser._id },
      process.env.JWT_SECRET,
      {},
      (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token)
          .status(201)
          .json({ id: createdUser._id, username });
      }
    );
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

const PORT = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
