import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import AddSupplier from "./pages/AddSupplier";
import AddProduct from "./pages/AddProduct";
import ViewProducts from "./pages/ViewProducts";
import SupplierList from "./pages/SupplierList"; // Import the Supplier List page
import InstallAppButton from "./components/InstallAppButton";

function App() {
  return (
    <Router>
      {/* Navbar */}
      <div className="bg-base-200 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold text-primary text-center mb-4 md:mb-0">
            Shop Management
          </h1>
          <nav className="flex flex-wrap gap-4 justify-center">
            <NavLink
              to="/add-supplier"
              className={({ isActive }) =>
                `btn btn-primary ${isActive ? "btn-active" : "btn-outline"}`
              }
            >
              Add Supplier
            </NavLink>
            <NavLink
              to="/add-product"
              className={({ isActive }) =>
                `btn btn-primary ${isActive ? "btn-active" : "btn-outline"}`
              }
            >
              Add Product
            </NavLink>
            <NavLink
              to="/view-products"
              className={({ isActive }) =>
                `btn btn-primary ${isActive ? "btn-active" : "btn-outline"}`
              }
            >
              View Products
            </NavLink>
            <NavLink
              to="/supplier-list" // Add a new navigation link for Supplier List
              className={({ isActive }) =>
                `btn btn-primary ${isActive ? "btn-active" : "btn-outline"}`
              }
            >
              Supplier List
            </NavLink>
          </nav>
          <InstallAppButton /> {/* Add the Install Button here */}
        </div>
      </div>

      {/* Page Content */}
      <div className="flex flex-col h-full">
        <div className="flex-grow container mx-auto px-4 py-8">
          <div className="bg-base-100 shadow-xl rounded-lg p-6">
            <Routes>
              <Route path="/add-supplier" element={<AddSupplier />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/view-products" element={<ViewProducts />} />
              <Route path="/supplier-list" element={<SupplierList />} /> {/* Add Supplier List route */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
