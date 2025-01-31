import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRoutes from "./routes/User.js";

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:3000", // Change this in production
    credentials: true, // Allow cookies/auth tokens
  })
);

// Routes
app.use("/api/user", UserRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// Test Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello developers from GFG" });
});

// MongoDB Connection
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://samgipson:sam12345@cluster0.2w7cx.mongodb.net/fitness", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB", error);
    process.exit(1); // Exit process with failure
  }
};

// Start Server
const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.log("❌ Server startup error:", error);
  }
};

startServer();
