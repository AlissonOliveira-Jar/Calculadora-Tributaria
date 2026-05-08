import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Ajuda() {
  // Estado dos dados do formulário
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });

  const token = localStorage.getItem("token");
  const [isVisible, setIsVisible] = useState(false);
  
  const [enviando, setEnviando] = useState(false);

  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true); // Avisa que começou a enviar (bloqueia botão)

    try {
      const response = await fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      

      if (response.ok) {
        alert('Mensagem enviada com sucesso ao NAF!');
        setFormData({ nome: "", email: "", mensagem: "" });
      } else {
        alert('Houve um erro ao enviar a mensagem. Tente novamente.');
      }
    } catch (error) {
      console.error("Erro:", error);
      alert('Erro de conexão com o servidor (O backend está rodando?).');
    } finally {
      setEnviando(false); // libera o botão
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-yellow-400 via-yellow-600 to-yellow-800 p-6">
        <div
          className={`w-full max-w-3xl bg-white p-8 rounded-2xl shadow-lg transition-all duration-[700ms] ease-out delay-[200ms] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h1
            className={`text-3xl font-bold text-gray-800 mb-6 text-center transition-all duration-[700ms] ease-out delay-[400ms] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            Ajuda e Informações
          </h1>

          <section
            className={`mb-8 text-gray-700 space-y-4 transition-all duration-[700ms] ease-out delay-[600ms] ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <p>
              Bem-vindo à página de ajuda da{" "}
              <strong>Calculadora Tributária</strong>! Aqui você encontra
              orientações sobre como utilizar o aplicativo e entender os cálculos
              realizados.
            </p>

            <h2 className="text-xl font-semibold text-gray-800">
              Como usar o aplicativo:
            </h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                Na página inicial, escolha o tipo de cálculo: Pessoa Física,
                Pessoa Jurídica ou Comparativo entre os dois impostos.
              </li>
              <li>
                Informe sua <strong>profissão</strong>, <strong>renda mensal</strong> e{" "}
                <strong>custos mensais</strong> nos campos indicados.
              </li>
              <li>
                O sistema calculará automaticamente o imposto devido com base nas
                tabelas atuais. E realizará o comparativo na pagina destinada.
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-800 mt-6">
              Cálculo para Pessoa Física (PF):
            </h2>
            <p>
              <strong>Base de cálculo:</strong> (Renda - Custos) - Parcela Dedutivel
              <br />
              <strong>Exemplo:</strong> R$ 3.000 - R$ 750 = R$ 2.250 → isento
              (abaixo de R$ 2.428,80)
            </p>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Tabela de Faixas do Imposto de Renda (Mensal)
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg text-sm text-gray-700">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="py-2 px-4 text-left border-b border-gray-200">
                        Faixa de Base (R$)
                      </th>
                      <th className="py-2 px-4 text-left border-b border-gray-200">
                        Alíquota (%)
                      </th>
                      <th className="py-2 px-4 text-left border-b border-gray-200">
                        Parcela Dedutível (R$)
                      </th>
                      <th className="py-2 px-4 text-left border-b border-gray-200">
                        Observação
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-gray-50">
                      <td className="py-2 px-4 border-b">Até 2.428,80</td>
                      <td className="py-2 px-4 border-b">Isento</td>
                      <td className="py-2 px-4 border-b">—</td>
                      <td className="py-2 px-4 border-b">Sem tributação</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">2.428,81 — 2.826,65</td>
                      <td className="py-2 px-4 border-b">7,5%</td>
                      <td className="py-2 px-4 border-b">182,16</td>
                      <td className="py-2 px-4 border-b">
                        (Base × 0,075) − 182,16
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-2 px-4 border-b">2.826,66 — 3.751,05</td>
                      <td className="py-2 px-4 border-b">15%</td>
                      <td className="py-2 px-4 border-b">394,16</td>
                      <td className="py-2 px-4 border-b">
                        (Base × 0,15) − 394,16
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">3.751,06 — 4.664,68</td>
                      <td className="py-2 px-4 border-b">22,5%</td>
                      <td className="py-2 px-4 border-b">675,49</td>
                      <td className="py-2 px-4 border-b">
                        (Base × 0,225) − 675,49
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-2 px-4 border-b">Acima de 4.664,68</td>
                      <td className="py-2 px-4 border-b">27,5%</td>
                      <td className="py-2 px-4 border-b">908,73</td>
                      <td className="py-2 px-4 border-b">
                        (Base × 0,275) − 908,73
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mt-6">
              Cálculo para Pessoa Jurídica (PJ):
            </h2>
            <p>
              Considera a alíquota de 6% do Simples Nacional (Anexo III) e o INSS
              sobre o pró-labore.
              <br />
              <strong>Exemplo:</strong>
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Renda: R$ 3.000</li>
              <li>28% da renda: R$ 840 → menor que o salário mínimo (R$ 1.518)</li>
              <li>Pró-labore: R$ 1.518</li>
              <li>Simples Nacional: 6% × 3.000 = R$ 180</li>
              <li>INSS (11% sobre pró-labore): R$ 166,98</li>
              <li>
                <strong>Total de tributos: R$ 346,98</strong>
              </li>
            </ul>
          </section>

          <hr className="my-6" />

          <section>
            <h1 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Ainda com dúvidas?
            </h1>
            <h2 className="font-semibold text-gray-800 mb-4 text-center">
            Envie uma mensagem ao desenvolvedor(NAF)
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 max-w-md mx-auto text-left"
            >
              <div className={`transition-all duration-[700ms] ease-out delay-[800ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <label className="block text-gray-700 mb-1">Nome:</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className="w-full border border-black rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition delay-[80ms] duration-[400ms]"
                />
              </div>

              <div className={`transition-all duration-[700ms] ease-out delay-[950ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <label className="block text-gray-700 mb-1">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-black rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition delay-[80ms] duration-[400ms]"
                />
              </div>

              <div className={`transition-all duration-[700ms] ease-out delay-[1100ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <label className="block text-gray-700 mb-1">Mensagem:</label>
                <textarea
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full border border-black rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition delay-[80ms] duration-[400ms]"
                ></textarea>
              </div>

              <div className={`transition-all duration-[700ms] ease-out delay-[1300ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                {/* BOTÃO ATUALIZADO PARA MOSTRAR FEEDBACK */}
                <button
                  type="submit"
                  disabled={enviando}
                  className={`w-full bg-yellow-500 text-white py-3 rounded-xl hover:bg-yellow-600 transition-all duration-[400ms] ease-out text-lg font-medium ${enviando ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {enviando ? "Enviando..." : "Enviar Mensagem"}
                </button>
              </div>
            </form>
          </section>

          <p className={`mt-8 text-center text-sm text-gray-500 transition-all duration-[700ms] ease-out delay-[1500ms] ${isVisible ? "opacity-100" : "opacity-0"}`}>
            {new Date().getFullYear()} Calculadora Tributária
          </p>
        </div>
      </div>
    </div>
  );
}