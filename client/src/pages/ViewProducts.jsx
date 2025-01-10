import React, { useState, useEffect } from "react";
import { getProductsBySupplier } from "../services/productService";
import { getSuppliers } from "../services/supplierService";

const ViewProducts = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");

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

  const handleSupplierChange = async (e) => {
    const supplierId = e.target.value;
    setSelectedSupplier(supplierId);
    if (supplierId) {
      try {
        const { products } = await getProductsBySupplier(supplierId);
        setProducts(products);
      } catch (error) {
        console.error(error);
      }
    } else {
      setProducts([]);
    }
  };

  return (
    <div>
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
      <table className="table w-full">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.itemName}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>{product.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewProducts;
