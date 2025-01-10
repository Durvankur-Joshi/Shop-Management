import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import AddSupplier from "./pages/AddSupplier";
import AddProduct from "./pages/AddProduct";
import ViewProducts from "./pages/ViewProducts";

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
          </nav>
        </div>
      </div>

      {/* Page Content */}
      <div className="flex flex-col h-full ">
        <div className="flex-grow container mx-auto px-4 py-8">
          <div className="bg-base-100 shadow-xl rounded-lg p-6">
            <Routes>
              <Route path="/add-supplier" element={<AddSupplier />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/view-products" element={<ViewProducts />} />
            </Routes>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-base-300 py-4 text-center bottom-">
          <p className="text-sm text-base-content">
            &copy; {new Date().getFullYear()} Shop Management. All rights reserved.
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
