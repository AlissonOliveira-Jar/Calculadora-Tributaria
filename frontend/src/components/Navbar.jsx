import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    }

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 text-lg font-bold text-gray-800">Calculadora Tributária</div>

          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/Home')}
                className="px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-sky-600 hover:scale-105 transition-all duration-[500ms] ease-in-out"
              >
                Página Inicial
              </button>

              <div className="h-6 w-px bg-gray-300" />

              <button
                onClick={() => navigate('/calculo-pf')}
                className="px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-sky-600 hover:scale-105 transition-all duration-[500ms] ease-in-out"
              >
                Calculo PF
              </button>

              <div className="h-6 w-px bg-gray-300" />

              <button
                onClick={() => navigate('/calculo-pj')}
                className="px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-sky-600 hover:scale-105 transition-all duration-[500ms] ease-in-out"
              >
                Calculo PJ
              </button>

              <div className="h-6 w-px bg-gray-300" />

              <button
                onClick={() => navigate('/comparativo')}
                className="px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-sky-600 hover:scale-105 transition-all duration-[500ms] ease-in-out"
              >
                Comparativo
              </button>

              <div className="h-6 w-px bg-gray-300" />

              <button
                onClick={() => navigate('/Ajuda')}
                className="px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-sky-600 hover:scale-105 transition-all duration-[500ms] ease-in-out"
              >
                Ajuda
              </button>
            </div>

            <button
              onClick={() => handleLogout() }
              className="ml-6 px-3 py-2 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 hover:scale-105 transition-all duration-[500ms] ease-in-out"
            >
              Deslogar
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

