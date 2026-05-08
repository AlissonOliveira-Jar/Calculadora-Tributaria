import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!name) newErrors.name = "Por favor, preencha o campo de nome.";
    if (!email) {
      newErrors.email = "Por favor, preencha o campo de email.";
    } else if (!email.includes("@") || !email.includes(".")) {
      newErrors.email = "Por favor, informe um email válido (contendo '@' e '.').";
    }
    if (!password) newErrors.password = "Por favor, preencha o campo de senha.";
    if (!confirmPassword) {
      newErrors.confirmPassword = "Por favor, confirme sua senha.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const formErrors = validateForm();

  if (Object.keys(formErrors).length > 0) {
    setErrors(formErrors);
    return;
  }
  setErrors({});

  try {
    console.log("Enviando dados para o backend:", { name, email, password });
    
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: name,
        email: email,
        senha: password
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      alert("Cadastro bem-sucedido! Faça o login para prosseguir.");
      console.log("Usuário cadastrado com ID:", data.userId);
      navigate("/");
    } else {
      // Mostra o erro retornado pelo backend
      alert(`Erro no cadastro: ${data.message}`);
      console.error("Erro do backend:", data);
    }
  } catch (error) {
    console.error("Erro ao conectar com o servidor:", error);
    alert("Erro ao conectar com o servidor. Verifique se o backend está rodando.");
  }
};

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b to-blue-600 via-sky-600 from-sky-300">
      <div
        className={`w-full max-w-sm p-8 bg-white rounded-2xl shadow-lg transition-all duration-[700ms] ease-out
          ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }
        `}
      >
        <h2
          className={`text-2xl font-bold text-center mb-6 text-gray-800 trasition-all duration-[700ms] ease-out delay-[100ms] ${
            isVisible ? "opacity-100 translate-0" : "opacity-0 translate-y-5"
          }`}
        >
          Cadastro
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div
            className={`transition-all duration-[700ms] ease-out delay-[400ms] ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition delay-[80ms] duration-[400ms] ease-in-out hover:-translate-y-1 hover:scale-102"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div
            className={`transition-all duration-[700ms] ease-out delay-[600ms] ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
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
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div
            className={`transition-all duration-[700ms] ease-out delay-[800ms] ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition delay-[80ms] duration-[400ms] ease-in-out hover:-translate-y-1 hover:scale-102"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div
            className={`transition-all duration-[700ms] ease-out delay-[1000ms] ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Confirmar Senha
            </label>
            <input
              type="password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition delay-[80ms] duration-[400ms] ease-in-out hover:-translate-y-1 hover:scale-102"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div
            className={`transition-all duration-[700ms] ease-out delay-[1200ms] ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition delay-[80ms] duration-[400ms] ease-in-out hover:scale-102"
            >
              Cadastrar
            </button>
          </div>
        </form>

        <p className={`pt-5 text-sm text-center transition-all duration-[800ms] ease-out delay-[1300ms] ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}>
          Já tem conta?{" "}
          <a href="/" className="text-blue-600 hover:underline">
            Faça login
          </a>
        </p>
      </div>

      <h2
        className={`block mb-2 mt-6 text-base font-medium text-black p-1 transition-all duration-[700ms] ease-out delay-[1350ms] ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        Desenvolvido por: Irmãos Metralha
      </h2>
    </div>
  );
}