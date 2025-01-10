import React, { useState } from "react";
import { addSupplier } from "../services/supplierService";

const AddSupplier = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSupplier(formData);
      alert("Supplier added successfully!");
      setFormData({ name: "", contact: "", address: "" });
    } catch (error) {
      console.error(error);
      alert("Failed to add supplier");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Supplier Name"
        value={formData.name}
        onChange={handleChange}
        className="input input-bordered w-full"
        required
      />
      <input
        type="text"
        name="contact"
        placeholder="Contact"
        value={formData.contact}
        onChange={handleChange}
        className="input input-bordered w-full"
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        className="input input-bordered w-full"
        required
      />
      <button type="submit" className="btn btn-primary w-full">
        Add Supplier
      </button>
    </form>
  );
};

export default AddSupplier;
