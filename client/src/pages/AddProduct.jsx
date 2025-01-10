import React, { useState, useEffect } from "react";
import { addProduct } from "../services/productService";
import { getSuppliers } from "../services/supplierService";

const AddProduct = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState({
    itemName: "",
    quantity: "",
    price: "",
    supplierId: "",
  });

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const { suppliers } = await getSuppliers();
        setSuppliers(suppliers);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSuppliers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct(formData);
      alert("Product added successfully!");
      setFormData({ itemName: "", quantity: "", price: "", supplierId: "" });
    } catch (error) {
      console.error(error);
      alert("Failed to add product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="itemName"
        placeholder="Item Name"
        value={formData.itemName}
        onChange={handleChange}
        className="input input-bordered w-full"
        required
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={formData.quantity}
        onChange={handleChange}
        className="input input-bordered w-full"
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="input input-bordered w-full"
        required
      />
      <select
        name="supplierId"
        value={formData.supplierId}
        onChange={handleChange}
        className="select select-bordered w-full"
        required
      >
        <option value="">Select Supplier</option>
        {suppliers.map((supplier) => (
          <option key={supplier._id} value={supplier._id}>
            {supplier.name}
          </option>
        ))}
      </select>
      <button type="submit" className="btn btn-primary w-full">
        Add Product
      </button>
    </form>
  );
};

export default AddProduct;
