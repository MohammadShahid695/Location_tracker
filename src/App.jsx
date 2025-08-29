import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Share from "./pages/Share";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/share/:id" element={<Share />} />
      </Routes>
    </BrowserRouter>
  );
}
