import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "./models/User.js";

const app = express();
dotenv.config();

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const createdUser = await User.create({ username, password });
  jwt.sign(
    { userId: createdUser._id },
    process.env.JWT_SECRET,
    (err, token) => {
      if (err) throw err;
      res.cookie("token", token).status(201).json("ok");
    }
  );
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
