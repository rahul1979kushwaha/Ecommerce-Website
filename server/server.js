// Import necessary packages
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const commonFeatureRouter = require("./routes/common/feature-routes");
const configenv = require("dotenv");

// Load environment variables from .env file
configenv.config();

// Create a database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Exit the process with error code if connection fails
  });

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS (Cross-Origin Resource Sharing)
app.use(
  cors({
    origin: "http://localhost:5173", // Change this to the frontend URL if different
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true, // Allow cookies to be sent in CORS requests
  })
);

// Middleware setup
app.use(cookieParser()); // For handling cookies
app.use(express.json()); // For parsing JSON requests

// Route handlers
app.use("/api/auth", authRouter); // Authentication routes
app.use("/api/admin/products", adminProductsRouter); // Admin product routes
app.use("/api/admin/orders", adminOrderRouter); // Admin order routes
app.use("/api/shop/products", shopProductsRouter); // Shop product routes
app.use("/api/shop/cart", shopCartRouter); // Shop cart routes
app.use("/api/shop/address", shopAddressRouter); // Shop address routes
app.use("/api/shop/order", shopOrderRouter); // Shop order routes
app.use("/api/shop/search", shopSearchRouter); // Shop search routes
app.use("/api/shop/review", shopReviewRouter); // Shop review routes
app.use("/api/common/feature", commonFeatureRouter); // Common features routes

// Start the server
app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
