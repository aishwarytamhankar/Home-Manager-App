import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Groceries from "./pages/Groceries";
import Pharmacy from "./pages/Pharmacy";
import ToBuy from "./pages/ToBuy";
import Spendings from "./pages/Spendings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/groceries" element={<Groceries />} />
        <Route path="/pharmacy" element={<Pharmacy />} />
        <Route path="/to-buy" element={<ToBuy />} />
        <Route path="/spendings" element={<Spendings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;