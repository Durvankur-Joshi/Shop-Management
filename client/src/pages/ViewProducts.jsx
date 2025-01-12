import React, { useState, useEffect } from "react";
import { getProductsBySupplier } from "../services/productService";
import { getSuppliers } from "../services/supplierService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewProducts = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const { suppliers } = await getSuppliers();
        setSuppliers(suppliers);
      } catch (err) {
        toast.error("Failed to load suppliers.");
        console.error(err);
      }
    };
    fetchSuppliers();
  }, []);

  const handleSupplierChange = async (e) => {
    const supplierId = e.target.value;
    setSelectedSupplier(supplierId);
    setProducts([]);
    setLoading(true);
    setError("");

    if (supplierId) {
      try {
        const { products } = await getProductsBySupplier(supplierId);
        setProducts(products);
      } catch (err) {
        toast.error("Failed to load products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const grandTotal = products.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );

  return (
    <div className="p-4">
      <ToastContainer position="top-right" autoClose={1000} />
      <h2 className="text-2xl font-bold mb-4">View Products</h2>
      <select
        onChange={handleSupplierChange}
        className="select select-bordered w-full mb-4"
      >
        <option value="">Select Supplier</option>
        {suppliers.map((supplier) => (
          <option key={supplier._id} value={supplier._id}>
            {supplier.name}
          </option>
        ))}
      </select>
      {loading ? (
        <p className="text-center text-primary">Loading products...</p>
      ) : products.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-xl text-white">
                <th>Date</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody className="text-[20px]">
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                  <td>{product.itemName}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity * product.price}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="text-right text-xl font-bold text-white">
                  Grand Total:
                </td>
                <td colSpan="2" className="font-bold text-xl text-white">
                  {grandTotal}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No products found for this supplier.</p>
      )}
    </div>
  );
};

export default ViewProducts;
