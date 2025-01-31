import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/User.js";

const app = express();
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form data

// const cors = require("cors");

// Allow requests from frontend
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,  // Allow cookies/auth tokens
}));


app.use("/api/user/", UserRoutes);
// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello developers from GFG",
  });
});

const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect("mongodb://localhost:27017/sece")
    .then(() => console.log("Connected to Mongo DB"))
    .catch((err) => {
      console.error("failed to connect with mongo");
      console.error(err);
    });
};

const startServer = async () => {
  try {
    connectDB();
    app.listen(8000, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
