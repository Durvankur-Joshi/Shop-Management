import express from "express";
import { addSupplier, getSuppliers } from "../controllers/supplierController.js";

const router = express.Router();

router.post("/", addSupplier); // Add a new supplier
router.get("/", getSuppliers); // Get all suppliers

export default router;
