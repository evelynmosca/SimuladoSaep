import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Movimentacao from "./pages/movimentacao";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movimentacao" element={<Movimentacao />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;