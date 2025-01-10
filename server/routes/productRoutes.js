import express from "express";
import { addProduct, getProductsBySupplier } from "../controllers/productController.js";

const router = express.Router();

router.post("/", addProduct); // Add a new product
router.get("/:supplierId", getProductsBySupplier); // Get products by supplier

export default router;
