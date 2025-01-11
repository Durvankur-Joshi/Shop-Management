import express from "express";
import { addSupplier, getSuppliers ,deleteSupplier } from "../controllers/supplierController.js";

const router = express.Router();

router.post("/", addSupplier); // Add a new supplier
router.get("/", getSuppliers); // Get all suppliers
router.delete("/:id", deleteSupplier);

export default router;
