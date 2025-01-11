import Supplier from "../models/Supplier.js";
import Product from "../models/Product.js";

// Add a new supplier
export const addSupplier = async (req, res) => {
  try {
    const { name, contact, address } = req.body;
    const supplier = new Supplier({ name, contact, address });
    await supplier.save();
    res.status(201).json({ success: true, supplier });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all suppliers
export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find().populate("products");
    res.status(200).json({ success: true, suppliers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete associated products
    await Product.deleteMany({ supplier: id });

    // Delete the supplier
    const deletedSupplier = await Supplier.findByIdAndDelete(id);

    if (!deletedSupplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    console.error("Error deleting supplier:", error);
    res.status(500).json({ message: "Failed to delete supplier" });
  }
};