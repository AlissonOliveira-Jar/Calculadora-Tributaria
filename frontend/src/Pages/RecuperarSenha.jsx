import { useState, useEffect } from "react";

export default function RecuperarSenha() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const validateForm = () => {
    if (!email) {
      setError("Por favor, preencha o campo de email.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Por favor, insira um formato de email válido.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setError("");
    console.log("Recuperação solicitada para:", email);
    alert(
      "Se este email estiver cadastrado, enviaremos instruções de recuperação."
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b to-blue-600 via-sky-600 from-sky-300">
      <div
        className={`w-full max-w-sm p-8 bg-white rounded-2xl shadow-lg transition-all duration-[700ms] ease-out
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <h2
          className={`text-2xl font-bold text-center mb-6 text-gray-800 transition-all duration-[700ms] ease-out delay-[200ms]
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          Recuperar Senha
        </h2>

        <p
          className={`text-center text-sm text-gray-600 mb-6 transition-all duration-[700ms] ease-out delay-[300ms]
            ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          Informe seu email e enviaremos as instruções para redefinir sua senha.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Campo Email */}
          <div
            className={`transition-all duration-[700ms] ease-out delay-[500ms]
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          >
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition delay-[80ms] duration-[400ms] ease-in-out hover:-translate-y-1 hover:scale-102"
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>

          <div
            className={`transition-all duration-[700ms] ease-out delay-[700ms]
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          >
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-[250ms] ease-in-out hover:scale-102"
            >
              Enviar
            </button>
          </div>
        </form>

        <p
          className={`text-center text-sm text-gray-600 mt-4 transition-all duration-[700ms] ease-out delay-[850ms]
            ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          Lembrou sua senha?{" "}
          <a href="/" className="text-blue-600 hover:underline">
            Faça login
          </a>
        </p>
      </div>

      <h2
        className={`block mb-2 mt-6 text-base font-medium text-black p-1 transition-all duration-[700ms] ease-out delay-[1000ms] ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        Desenvolvido por: Irmãos Metralha
      </h2>
    </div>
  );
}
