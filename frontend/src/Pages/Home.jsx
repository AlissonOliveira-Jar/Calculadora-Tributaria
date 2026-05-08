import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

    const token = localStorage.getItem("token");
    useEffect(() => {
      if (!token) {
        navigate("/");
      }
    }, [token, navigate])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b to-blue-600 via-sky-600 from-sky-300">
        <div
          className={`w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg text-center transition-all duration-[700ms] ease-out delay-[200ms]
          ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h1
            className={`text-3xl font-bold text-gray-800 mb-6 transition-all duration-[700ms] ease-out delay-[400ms]
          ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          >
          Bem-vindo a Calculadora Tributária
          </h1>

          <p
            className={`text-gray-600 mb-8 transition-all duration-[700ms] ease-out delay-[600ms]
            ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            Escolha abaixo o tipo de cálculo que deseja realizar:
          </p>

          <div>
            <div className="grid gap-4 transition delay-[80ms] duration-[400ms] ease-in-out hover:scale-102 p-1">
              <button
                onClick={() => handleNavigate("/calculo-pf")}
                className={`w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 text-lg font-medium shadow-lg hover:shadow-xl scale-105 transform transition-all duration-[700ms] ease-out hover:duration-[250ms] delay-[700ms] 
              ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              >
                Imposto de Renda - Pessoa Física
              </button>
            </div>
            <div className="grid gap-4 transition delay-[80ms] duration-[400ms] ease-in-out hover:scale-102 p-1">
              <button
                onClick={() => handleNavigate("/calculo-pj")}
                className={`w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 text-lg font-medium shadow-lg hover:shadow-xl scale-105 transform transition-all duration-[700ms] ease-out hover:duration-[250ms] delay-[900ms]
              ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              >
                Imposto de Renda - Pessoa Jurídica
              </button>
            </div>

            <div className="grid gap-4 transition delay-[80ms] duration-[400ms] ease-in-out hover:scale-102 p-1">
              <button
                onClick={() => handleNavigate("/comparativo")}
                className={`w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 text-lg font-medium shadow-lg hover:shadow-xl scale-105 transform transition-all duration-[700ms] ease-out hover:duration-[250ms] delay-[1100ms]
              ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              >
                Comparativo PF vs PJ
              </button>
            </div>

            <div className="grid gap-4 transition delay-[80ms] duration-[400ms] ease-in-out hover:scale-102 p-1">
              <button
                onClick={() => handleNavigate("/Ajuda")}
                className={`w-full bg-yellow-500 text-white py-3 rounded-xl hover:bg-yellow-600 text-lg font-medium shadow-lg hover:shadow-xl scale-105 transform transition-all duration-[700ms] ease-out hover:duration-[250ms] delay-[1300ms]
              ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              >
                Ajuda / Informações
              </button>
            </div>
          </div>

          <p
            className={`mt-8 text-sm text-gray-500 transition-all duration-[700ms] ease-out delay-[1200ms] ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
          {new Date().getFullYear()} Calculadora Tributária
          </p>
        </div>
      </div>
    </div>
  );
}
