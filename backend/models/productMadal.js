import mongoose from "mongoose";

// Define Product Schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [0, "Price cannot be negative"],
        max: [10000, "Price cannot exceed 10000"],
    },
   
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create Product Model
const Product = mongoose.model("Product", productSchema);

export default Product;
