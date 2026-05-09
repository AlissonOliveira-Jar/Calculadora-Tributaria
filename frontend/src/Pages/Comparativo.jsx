import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";

export default function Comparativo() {
  const [renda, setRenda] = useState("");
  const [custos, setCustos] = useState("");
  const [erro, setErro] = useState("");
  const [resultado, setResultado] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltipRenda, setShowTooltipRenda] = useState(false);
  const [showTooltipCustos, setShowTooltipCustos] = useState(false);
  const [profissao, setProfissao] = useState("psicologo");
  const [mostrarEmail, setMostrarEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [mensagemEnvio, setMensagemEnvio] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

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

  const calcularComparativo = () => {
    const rendaNum = parseFloat(renda);
    const custosNum = parseFloat(custos);

    if (isNaN(rendaNum) || isNaN(custosNum)) {
      setResultado("Por favor, insira valores válidos.");
      return;
    }

    // --- LÓGICA DA PESSOA FÍSICA (Idêntica para todos) ---
    const base = rendaNum - custosNum;
    let impostoPF = 0;
    let faixa = "Isento";
    let parcelaDedutivel = 0;

    if (base <= 2428.8) {
      faixa = "Isento";
    } else if (base <= 2826.65) {
      impostoPF = base * 0.075 - 182.16;
      faixa = "7,5%";
      parcelaDedutivel = 182.16;
    } else if (base <= 3751.05) {
      impostoPF = base * 0.15 - 394.16;
      faixa = "15%";
      parcelaDedutivel = 394.16;
    } else if (base <= 4664.68) {
      impostoPF = base * 0.225 - 675.49;
      faixa = "22,5%";
      parcelaDedutivel = 675.49;
    } else {
      impostoPF = base * 0.275 - 908.73;
      faixa = "27,5%";
      parcelaDedutivel = 908.73;
    }
    impostoPF = impostoPF <= 0 ? 0 : impostoPF;

    // --- LÓGICA DA PESSOA JURÍDICA (Depende da profissão) ---
    let simples = 0;
    let aliquotaPJ = "";

    if (profissao === "advogado") {
      simples = rendaNum * 0.045; // Anexo IV: 4,5%
      aliquotaPJ = "4,5%";
    } else {
      // Psicólogo e Arquiteto
      simples = rendaNum * 0.06; // Anexo III (com Fator R): 6%
      aliquotaPJ = "6%";
    }

    const salario28 = rendaNum * 0.28;
    const salarioMin = 1518;
    const salarioBase = salario28 < salarioMin ? salarioMin : salario28;
    const inss = salarioBase * 0.11;
    const totalPJ = simples + inss;

    // --- COMPARAÇÃO ---
    const diferenca = Math.abs(totalPJ - impostoPF);
    const maisVantajoso = totalPJ < impostoPF ? "Pessoa Jurídica (PJ)" : "Pessoa Física (PF)";

    setResultado({
      pf: { base, faixa, parcelaDedutivel, imposto: impostoPF },
      pj: { simples, aliquota: aliquotaPJ, salarioBase, inss, total: totalPJ },
      maisVantajoso,
      diferenca
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

  const gerarPDF = () => {
    const elemento = document.getElementById("resultado-comparativo");
    
    // Configurações do PDF
    const opcoes = {
      margin:       10,
      filename:     `Comparativo_Tributario_${profissao}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opcoes).from(elemento).save();
  };

  return (
    <div className="flex flex-col min-h-screen bg-naf-light">
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div
          className={`w-full max-w-lg bg-white rounded-3xl shadow-xl p-8 border border-naf-gray/20 transition-all duration-[700ms] ease-out delay-[200ms] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2
            className={`text-2xl font-bold text-center mb-6 text-naf-blue transition-all duration-[700ms] ease-out delay-[400ms] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            Comparativo PF vs PJ
          </h2>

          <div className="space-y-4">
            <div
              className={`transition-all duration-[700ms] ease-out delay-[500ms] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <label className="block mb-1 text-sm font-medium text-naf-blue">
                Profissão
              </label>
              <select
                value={profissao}
                onChange={(e) => setProfissao(e.target.value)}
                className="w-full border border-naf-gray px-4 py-2 rounded-xl focus:ring-2 focus:ring-naf-red outline-none transition delay-[80ms] duration-[400ms] ease-in-out"
              >
                <option value="psicologo">Psicólogo(a)</option>
                <option value="arquiteto">Arquiteto(a)</option>
                <option value="advogado">Advogado(a)</option>
              </select>
            </div>

            <div
              className={`transition-all duration-[700ms] ease-out delay-[600ms] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="relative flex items-center gap-1 mb-1">
                <label className="text-sm font-medium text-naf-blue">
                  Renda Mensal (R$)
                </label>
                <button
                  type="button"
                  className="text-naf-gray hover:text-naf-blue focus:outline-none"
                  onMouseEnter={() => setShowTooltipRenda(true)}
                  onMouseLeave={() => setShowTooltipRenda(false)}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </button>
                {showTooltipRenda && (
                  <div className="absolute z-10 w-64 p-3 text-sm text-white bg-naf-blue rounded-xl shadow-lg -top-2 left-full ml-2 border border-naf-gray/30">
                    Sua receita bruta total prevista para o mês.
                  </div>
                )}
              </div>
              <input
                type="number"
                value={renda}
                onChange={handleRendaChange}
                max="15000"
                placeholder="Ex: 3000"
                className="w-full border border-naf-gray px-4 py-2 rounded-xl focus:ring-2 focus:ring-naf-red outline-none transition delay-[80ms] duration-[400ms] ease-in-out"
              />
              {erro && <p className="text-naf-red text-sm mt-1 font-medium">{erro}</p>}
            </div>

            <div
              className={`transition-all duration-[700ms] ease-out delay-[700ms] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="relative flex items-center gap-1 mb-1">
                <label className="text-sm font-medium text-naf-blue">
                  Custos Mensais Dedutíveis (R$)
                </label>
                <button
                  type="button"
                  className="text-naf-gray hover:text-naf-blue focus:outline-none"
                  onMouseEnter={() => setShowTooltipCustos(true)}
                  onMouseLeave={() => setShowTooltipCustos(false)}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </button>
                {showTooltipCustos && (
                  <div className="absolute z-10 w-64 p-3 text-sm text-white bg-naf-blue rounded-xl shadow-lg -top-2 left-full ml-2 border border-naf-gray/30">
                    Despesas do seu negócio que podem ser deduzidas no Livro Caixa da PF.
                  </div>
                )}
              </div>
              <input
                type="number"
                value={custos}
                onChange={(e) => setCustos(e.target.value)}
                placeholder="Ex: 750"
                className="w-full border border-naf-gray px-4 py-2 rounded-xl focus:ring-2 focus:ring-naf-red outline-none transition delay-[80ms] duration-[400ms] ease-in-out"
              />
            </div>

            <div
              className={`transition-all duration-[700ms] ease-out delay-[800ms] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <button
                onClick={calcularComparativo}
                className="w-full bg-naf-blue text-white font-bold py-3 rounded-xl hover:bg-[#0c1825] hover:scale-105 transition-all duration-[400ms] ease-out shadow-md"
              >
                Gerar Comparativo
              </button>
            </div>

            {resultado && typeof resultado === "string" ? (
              <p className="text-naf-red font-medium text-center mt-4">{resultado}</p>
            ) : resultado && (
              <div
                className={`bg-gray-50 border border-naf-gray/20 rounded-xl shadow-inner mt-4 p-5 transition-all duration-[400ms] ease-out ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                <div id="resultado-comparativo" className="p-2">
                  <h3 className="text-center text-lg font-bold text-naf-blue mb-4 uppercase">Relatório de Comparação</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-naf-gray/30 p-3 rounded-lg bg-white">
                      <h3 className="font-bold text-naf-blue mb-2 border-b pb-1">Pessoa Física</h3>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p><strong>Base:</strong> R$ {resultado.pf.base.toFixed(2)}</p>
                        <p><strong>Faixa:</strong> {resultado.pf.faixa}</p>
                        <p><strong>Dedutível:</strong> R$ {resultado.pf.parcelaDedutivel.toFixed(2)}</p>
                        <p className="font-bold text-naf-red mt-2 pt-1 border-t">Total: R$ {resultado.pf.imposto.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="border border-naf-gray/30 p-3 rounded-lg bg-white">
                      <h3 className="font-bold text-naf-blue mb-2 border-b pb-1">Pessoa Jurídica</h3>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p><strong>Simples ({resultado.pj.aliquota}):</strong> R$ {resultado.pj.simples.toFixed(2)}</p>
                        <p><strong>Pró-labore:</strong> R$ {resultado.pj.salarioBase.toFixed(2)}</p>
                        <p><strong>INSS (11%):</strong> R$ {resultado.pj.inss.toFixed(2)}</p>
                        <p className="font-bold text-naf-red mt-2 pt-1 border-t">Total: R$ {resultado.pj.total.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t-2 border-naf-blue text-center bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-lg font-bold text-naf-blue">
                      Opção mais vantajosa: <span className="text-naf-red">{resultado.maisVantajoso}</span>
                    </p>
                    <p className="text-sm font-medium text-gray-600 mt-1">
                      Economia estimada: R$ {resultado.diferenca.toFixed(2)} / mês
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-naf-gray/30 flex flex-col gap-3">
                  <button
                    onClick={gerarPDF}
                    className="w-full bg-naf-red text-white font-bold py-2 rounded-xl hover:bg-[#a62b18] hover:scale-105 transition-all duration-[400ms] shadow-sm flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    Baixar Relatório em PDF
                  </button>

                  <div className="text-center mt-2">
                    <button
                      onClick={() => setMostrarEmail(!mostrarEmail)}
                      className="text-sm font-medium text-naf-blue hover:text-naf-red transition-colors underline"
                    >
                      Ou envie para o seu e-mail
                    </button>
                  </div>

                  {mostrarEmail && (
                    <div className="mt-2 space-y-3 p-3 bg-white border border-naf-gray/30 rounded-xl">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Seu e-mail"
                        className="w-full border border-naf-gray px-4 py-2 rounded-lg focus:ring-2 focus:ring-naf-blue outline-none text-sm"
                      />
                      <button
                        onClick={enviarEmail}
                        className="w-full bg-naf-blue text-white py-2 rounded-lg hover:bg-[#0c1825] transition text-sm font-bold"
                      >
                        Enviar
                      </button>
                      {mensagemEnvio && (
                        <p className="text-sm font-bold text-green-600 text-center">{mensagemEnvio}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
