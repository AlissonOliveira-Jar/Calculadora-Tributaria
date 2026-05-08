import { useState } from 'react'
import Login from "./Pages/Login"
import Cadastro from "./Pages/Cadastro"
import Home from "./Pages/Home"
import RecuperarSenha from './Pages/RecuperarSenha'
import CalculoPF from './Pages/CalculoPF'
import CalculoPJ from './Pages/CalculoPJ'
import Comparativo from './Pages/Comparativo'
import Ajuda from './Pages/Ajuda'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/Cadastro" element={<Cadastro />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/RecuperarSenha" element={<RecuperarSenha />} />
          <Route path="/calculo-pf" element={<CalculoPF />} />
          <Route path="/calculo-pj" element={<CalculoPJ />} />
          <Route path="/comparativo" element={<Comparativo />} />
          <Route path="/Ajuda" element={<Ajuda />} />
          <Route path="*" element={<p>ERRO 404</p>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
