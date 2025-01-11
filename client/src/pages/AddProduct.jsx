import React, { useState, useEffect } from "react";
import { addProduct } from "../services/productService";
import { getSuppliers } from "../services/supplierService";

const AddProduct = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [rows, setRows] = useState(
    Array(5).fill({ itemName: "", quantity: 0, price: 0, amount: 0 }) // Static 5 rows
  );
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

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;

    // Automatically calculate "amount" when quantity or price changes
    if (field === "quantity" || field === "price") {
      updatedRows[index].amount =
        (updatedRows[index].quantity || 0) * (updatedRows[index].price || 0);
    }

    setRows(updatedRows);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSupplier) {
      alert("Please select a supplier!");
      return;
    }

    try {
      for (const product of rows) {
        if (product.itemName && product.quantity > 0 && product.price > 0) {
          await addProduct({ ...product, supplierId: selectedSupplier });
        }
      }
      alert("Products added successfully!");
      setRows(Array(5).fill({ itemName: "", quantity: 0, price: 0, amount: 0 }));
      setSelectedSupplier("");
    } catch (error) {
      console.error(error);
      alert("Failed to add products.");
    }
  };

  const netAmount = rows.reduce((total, row) => total + row.amount, 0);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Products</h2>

      {/* Supplier Dropdown */}
      <select
        value={selectedSupplier}
        onChange={(e) => setSelectedSupplier(e.target.value)}
        className="select select-bordered w-full mb-4"
        required
      >
        <option value="">Select Supplier</option>
        {suppliers.map((supplier) => (
          <option key={supplier._id} value={supplier._id}>
            {supplier.name}
          </option>
        ))}
      </select>

      {/* Static Table */}
      <form onSubmit={handleSubmit}>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={row.itemName}
                      onChange={(e) =>
                        handleInputChange(index, "itemName", e.target.value)
                      }
                      className="input input-bordered w-full"
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.quantity}
                      onChange={(e) =>
                        handleInputChange(index, "quantity", parseInt(e.target.value) || 0)
                      }
                      className="input input-bordered w-full"
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.price}
                      onChange={(e) =>
                        handleInputChange(index, "price", parseFloat(e.target.value) || 0)
                      }
                      className="input input-bordered w-full"
                      required
                    />
                  </td>
                  <td>{row.amount}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="text-right font-bold">
                  Net Amount:
                </td>
                <td className="font-bold">{netAmount}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full mt-4">
          Submit Products
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
