import React, { useState, useEffect, useMemo } from "react";
import { addProduct } from "../services/productService";
import { getSuppliers } from "../services/supplierService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [rows, setRows] = useState(
    Array.from({ length: 5 }, () => ({ itemName: "", quantity: 0, price: 0, amount: 0 }))
  );
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const { suppliers } = await getSuppliers();
        setSuppliers(suppliers);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch suppliers!");
      }
    };
    fetchSuppliers();
  }, []);

  const handleInputChange = (index, field, value) => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      const updatedRow = { ...updatedRows[index], [field]: value };

      // Calculate the amount immediately based on the latest values
      if (field === "quantity" || field === "price") {
        const quantity = field === "quantity" ? parseInt(value) || 0 : updatedRow.quantity;
        const price = field === "price" ? parseFloat(value) || 0 : updatedRow.price;
        updatedRow.amount = quantity * price;
      }

      updatedRows[index] = updatedRow;
      return updatedRows;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSupplier) {
      toast.warning("Please select a supplier!");
      return;
    }

    setIsLoading(true); // Start loading
    try {
      let addedProducts = 0;
      for (const product of rows) {
        if (product.itemName && product.quantity > 0 && product.price > 0) {
          await addProduct({ ...product, supplierId: selectedSupplier });
          addedProducts++;
        }
      }

      if (addedProducts > 0) {
        toast.success(`${addedProducts} product(s) added successfully!`);
      } else {
        toast.info("No valid products to add!");
      }

      setRows(
        Array.from({ length: 5 }, () => ({ itemName: "", quantity: 0, price: 0, amount: 0 }))
      );
      setSelectedSupplier("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add products.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const netAmount = useMemo(() => {
    return rows.reduce((total, row) => total + row.amount, 0);
  }, [rows]);

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
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.quantity}
                      onChange={(e) =>
                        handleInputChange(index, "quantity", parseInt(e.target.value))
                      }
                      className="input input-bordered w-full"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.price}
                      onChange={(e) =>
                        handleInputChange(index, "price", parseFloat(e.target.value))
                      }
                      className="input input-bordered w-full"
                    />
                  </td>
                  <td>{row.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="text-right font-bold">
                  Net Amount:
                </td>
                <td className="font-bold">{netAmount.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
          disabled={isLoading} // Disable when loading
        >
          {isLoading ? "Submitting..." : "Submit Products"}
        </button>
      </form>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
