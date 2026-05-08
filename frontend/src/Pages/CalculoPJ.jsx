import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function CalculoPJ() {
  const [renda, setRenda] = useState("");
  const [erro, setErro] = useState("");
  const [resultado, setResultado] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const [mostrarEmail, setMostrarEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [mensagemEnvio, setMensagemEnvio] = useState("");
  const [profissao, setProfissao] = useState("psicologo");
  const [showTooltipRenda, setShowTooltipRenda] = useState(false);

    const token = localStorage.getItem("token");
  const navigate = useNavigate();
    useEffect(() => {
      if (!token) {
        navigate("/");
      }
    }, [token, navigate])

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleRendaChange = (e) => {
    const valor = parseFloat(e.target.value);
    if (valor > 15000) {
      setErro("O valor máximo permitido é R$ 15.000,00");
      setRenda(15000);
    } else {
      setErro("");
      setRenda(e.target.value);
    }
  };

  const calcularPJ = () => {
    const rendaNum = parseFloat(renda);
    if (isNaN(rendaNum)) {
      setResultado("Por favor, insira um valor válido.");
      return;
    }

    const simples = rendaNum * 0.06;
    const salario28 = rendaNum * 0.28;
    const salarioMin = 1518;
    const salarioBase = salario28 < salarioMin ? salarioMin : salario28;
    const inss = salarioBase * 0.11;
    const total = simples + inss;

    setResultado({
      simples,
      salarioBase,
      inss,
      total,
    });

    setMostrarEmail(false);
    setMensagemEnvio("");
  };

  const enviarEmail = () => {
    if (!email.includes("@")) {
      setMensagemEnvio("Por favor, insira um e-mail válido.");
      return;
    }

    setMensagemEnvio(`Resultados enviados para ${email} com sucesso!`);
    setEmail("");
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-lime-400 via-lime-800 to-lime-950 p-6">
        <div
          className={`w-full max-w-md bg-white rounded-2xl shadow-lg p-8 transition-all duration-[700ms] ease-out delay-[200ms] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2
            className={`text-2xl font-bold text-center mb-6 text-gray-800 transition-all duration-[700ms] ease-out delay-[400ms] ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            Cálculo IR Pessoa Jurídica
          </h2>

          <div className="space-y-4">
            <div
              className={`transition-all duration-[700ms] ease-out delay-[600ms] ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Profissão
              </label>
              <select
                value={profissao}
                onChange={(e) => setProfissao(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition delay-[80ms] duration-[400ms] ease-in-out"
              >
                <option value="psicologo">Psicólogo(a)</option>
              </select>
            </div>

            <div
              className={`transition-all duration-[700ms] ease-out delay-[800ms] ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="relative">
                <label className="block mb-1 text-sm font-medium text-gray-700 inline-flex items-center gap-1">
                  Renda Mensal (R$)
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    onMouseEnter={() => setShowTooltipRenda(true)}
                    onMouseLeave={() => setShowTooltipRenda(false)}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </button>
                </label>
                {showTooltipRenda && (
                  <div className="absolute z-10 w-64 p-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg -top-2 left-full ml-2">
                    É o valor que você espera receber por mês com o seu trabalho. No caso da psicologia, pode ser o total recebido das consultas, atendimentos ou serviços prestados, antes de descontar as despesas.
                  </div>
                )}
              </div>
              <input
                type="number"
                value={renda}
                onChange={handleRendaChange}
                max="15000"
                placeholder="Ex: 3000"
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition delay-[80ms] duration-[400ms] ease-in-out"
              />
              {erro && <p className="text-red-600 text-sm mt-1">{erro}</p>}
            </div>

            <div
              className={`transition-all duration-[700ms] ease-out delay-[800ms] ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <button
                onClick={calcularPJ}
                className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition-all duration-[400ms] ease-out"
              >
                Calcular
              </button>
            </div>

            {resultado && (
              <div
                className={`bg-gray-100 rounded-lg shadow-inner mt-4 p-4 transition-all duration-[700ms] ease-out delay-[1000ms] ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0"
                }`}
              >
                {typeof resultado === "string" ? (
                  <p className="text-red-600 font-medium">{resultado}</p>
                ) : (
                  <>
                    <p>
                      <strong>Simples Nacional (6%):</strong> R${" "}
                      {resultado.simples.toFixed(2)}
                    </p>
                    <p>
                      <strong>Pró-labore base:</strong> R${" "}
                      {resultado.salarioBase.toFixed(2)}
                    </p>
                    <p>
                      <strong>INSS (11%):</strong> R${" "}
                      {resultado.inss.toFixed(2)}
                    </p>
                    <p className="text-lg font-semibold mt-2">
                      Total a pagar: R$ {resultado.total.toFixed(2)}
                    </p>

                    <div className="mt-5 border-t pt-3">
                      <p className="text-sm text-gray-700 mb-2">
                        Deseja receber os resultados por e-mail?
                      </p>
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={() => setMostrarEmail(true)}
                          className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 transition"
                        >
                          Sim
                        </button>
                        <button
                          onClick={() => setMostrarEmail(false)}
                          className="bg-gray-400 text-white px-4 py-1 rounded-lg hover:bg-gray-500 transition"
                        >
                          Não
                        </button>
                      </div>

                      {mostrarEmail && (
                        <div className="mt-3 space-y-2">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Digite seu e-mail"
                            className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                          <button
                            onClick={enviarEmail}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                          >
                            Enviar resultados
                          </button>
                        </div>
                      )}

                      {mensagemEnvio && (
                        <p className="text-green-600 mt-2 text-sm font-medium text-center">
                          {mensagemEnvio}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
