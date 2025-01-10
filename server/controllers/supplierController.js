import Supplier from "../models/Supplier.js";

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
