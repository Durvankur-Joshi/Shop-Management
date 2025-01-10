import Product from "../models/Product.js";
import Supplier from "../models/Supplier.js";

// Add a new product
export const addProduct = async (req, res) => {
  try {
    const { itemName, quantity, price, supplierId } = req.body;
    const totalPrice = quantity * price;

    const product = new Product({
      itemName,
      quantity,
      price,
      totalPrice,
      supplier: supplierId,
    });

    await product.save();

    // Add the product to the supplier's product list
    const supplier = await Supplier.findById(supplierId);
    supplier.products.push(product._id);
    await supplier.save();

    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all products by supplier
export const getProductsBySupplier = async (req, res) => {
  try {
    const { supplierId } = req.params;
    const products = await Product.find({ supplier: supplierId });
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
