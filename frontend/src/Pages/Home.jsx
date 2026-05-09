import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

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
    <div className="flex flex-col min-h-screen bg-naf-light">
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div
          className={`w-full max-w-lg p-10 bg-white rounded-3xl shadow-xl border border-naf-gray/20 text-center transition-all duration-[700ms] ease-out delay-[200ms]
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <h1
            className={`text-3xl font-bold text-naf-blue mb-4 transition-all duration-[700ms] ease-out delay-[400ms]
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          >
            Calculadora Tributária
          </h1>

          <p
            className={`text-naf-gray mb-10 text-sm font-medium transition-all duration-[700ms] ease-out delay-[600ms]
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Selecione a modalidade de cálculo que deseja realizar:
          </p>

          <div className="space-y-4">
            <button
              onClick={() => handleNavigate("/calculo-pf")}
              className={`w-full bg-naf-blue text-white py-4 rounded-xl hover:bg-[#0c1825] text-lg font-medium shadow-md hover:shadow-lg transform transition-all duration-[400ms] hover:scale-105
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 delay-[700ms]"}`}
            >
              Imposto de Renda - Pessoa Física
            </button>

            <button
              onClick={() => handleNavigate("/calculo-pj")}
              className={`w-full bg-naf-blue text-white py-4 rounded-xl hover:bg-[#0c1825] text-lg font-medium shadow-md hover:shadow-lg transform transition-all duration-[400ms] hover:scale-105
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 delay-[850ms]"}`}
            >
              Imposto de Renda - Pessoa Jurídica
            </button>

            <button
              onClick={() => handleNavigate("/comparativo")}
              className={`w-full bg-naf-red text-white py-4 rounded-xl hover:bg-[#a62b18] text-lg font-bold shadow-md hover:shadow-lg transform transition-all duration-[400ms] hover:scale-105
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 delay-[1000ms]"}`}
            >
              Comparativo PF vs PJ
            </button>

            <button
              onClick={() => handleNavigate("/Ajuda")}
              className={`w-full bg-white border-2 border-naf-blue text-naf-blue py-3 rounded-xl hover:bg-naf-light text-base font-medium shadow-sm hover:shadow-md transform transition-all duration-[400ms] hover:scale-105 mt-2
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 delay-[1150ms]"}`}
            >
              Ajuda / Informações
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
