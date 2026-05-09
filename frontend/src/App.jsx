import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Cadastro from "./Pages/Cadastro";
import RecuperarSenha from "./Pages/RecuperarSenha";
import Home from "./Pages/Home";
import CalculoPF from "./Pages/CalculoPF";
import CalculoPJ from "./Pages/CalculoPJ";
import Comparativo from "./Pages/Comparativo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/RecuperarSenha" element={<RecuperarSenha />} />

        {/* Rotas Logadas */}
        <Route path="/Home" element={<Home />} />
        <Route path="/calculo-pf" element={<CalculoPF />} />
        <Route path="/calculo-pj" element={<CalculoPJ />} />
        <Route path="/comparativo" element={<Comparativo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
