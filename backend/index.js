import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv"; 
import cors from 'cors';
import ProductRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Default Route for Root ("/")
app.get("/", (req, res) => {
    res.send("API is running successfully!");
});

// API Routes
app.use("/api", ProductRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
