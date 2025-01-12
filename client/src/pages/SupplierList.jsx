import React, { useState, useEffect } from "react";
import { getSuppliers, deleteSupplier } from "../services/supplierService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const { suppliers } = await getSuppliers();
      setSuppliers(suppliers);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch suppliers.");
      console.error(err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      try {
        setLoading(true);
        await deleteSupplier(id);
        setSuppliers(suppliers.filter((supplier) => supplier._id !== id));
        toast.success("Supplier deleted successfully!");
        setLoading(false);
      } catch (err) {
        setError("Failed to delete supplier.");
        toast.error("Failed to delete supplier.");
        console.error(err);
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-4">
      <ToastContainer position="top-right" autoClose={1000} />
      <h2 className="text-2xl font-bold mb-4">Supplier List</h2>
      {error && <p className="text-error mb-4">{error}</p>}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : suppliers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier._id}>
                  <td>{supplier.name}</td>
                  <td>{supplier.contact}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(supplier._id)}
                      className="btn btn-error btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No suppliers found.</p>
      )}
    </div>
  );
};

export default SupplierList;
