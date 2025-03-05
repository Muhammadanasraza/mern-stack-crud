import express from "express";
import { createProduct, deleteProduct, getAvailableProduct, updateProduct } from "../controllers/productController.js";

const router = express.Router();

// Route to Create a New Product with Image Upload
router.post("/products",   createProduct);

// Route to Get All Available Products
router.get("/products/available", getAvailableProduct);


// Route to delete Available Products
router.delete("/products/available/delete:id", deleteProduct);

router.put("/products/available/edite:id", updateProduct);

export default router;
