import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Recipes from "./pages/Recipes";
import Carts from "./pages/Carts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/carts" element={<Carts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
