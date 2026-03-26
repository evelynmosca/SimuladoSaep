import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Home from "./pages/home";
import Produtos from "./pages/produtos";
import Estoque from "./pages/estoque";
import PrivateRoute from "./routes/privateroute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/login"
          element={<PrivateRoute><Login /></PrivateRoute>}
        />

        <Route
          path="/home"
          element={<PrivateRoute><Home /></PrivateRoute>}
        />

        <Route
          path="/produtos"
          element={<PrivateRoute><Produtos /></PrivateRoute>}
        />

        <Route
          path="/estoque"
          element={<PrivateRoute><Estoque /></PrivateRoute>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;