import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Por favor, preencha o campo de email.";
    } else if (!email.includes("@") || !email.includes(".")) {
      newErrors.email = "Por favor, informe um email válido (contendo '@' e '.').";
    }
    if (!password) newErrors.password = "Por favor, preencha o campo de senha.";
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
    console.log("Enviando dados para login:", { email, password });
    
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        senha: password
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log("Login bem-sucedido!", data);
      alert("Login bem-sucedido!");
      
      // Salva o token no localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Navega para a Home
      navigate("/Home");
    } else {
      // Mostra o erro retornado pelo backend
      alert(`Erro no login: ${data.message}`);
      console.error("Erro do backend:", data);
    }
  } catch (error) {
    console.error("Erro ao conectar com o servidor:", error);
    alert("Erro ao conectar com o servidor. Verifique se o backend está rodando.");
  }
};

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b to-blue-600 via-sky-600 from-sky-300 p-4"
    >
      <h1
        className={`text-3xl font-bold text-center mb-6 text-black transition-all duration-[700ms] ease-out delay-[200ms]
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
      >
        CALCULADORA DE IMPOSTO DE RENDA
      </h1>

      <div
        className={`w-full max-w-sm p-8 bg-white rounded-2xl shadow-xl transition-all duration-[700ms] ease-out delay-[300ms]
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <h2
          className={`text-2xl font-bold text-center mb-6 text-gray-800 transition-all duration-[700ms] ease-out delay-[500ms] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div
            className={`transition-all duration-[700ms] ease-out delay-[700ms] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  const val = e.target.value;
                  if (val && val.includes("@") && val.includes(".")) {
                    setErrors((prev) => ({ ...prev, email: undefined }));
                  }
                }
              }}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition delay-[80ms] duration-[400ms] ease-in-out hover:-translate-y-1 hover:scale-102"
            />
            <div>
              <p
                className="mt-1 text-sm text-red-600"
              >
                {errors.email || " "}
              </p>
            </div>
          </div>

          <div
            className={`transition-all duration-[700ms] ease-out delay-[850ms] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
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
              <p
                className="mt-1 text-sm text-red-600"
              >
                {errors.password}
              </p>
            )}
          </div>

          <div
            className={`transition-all duration-[700ms] ease-out delay-[1000ms] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition delay-[80ms] duration-[400ms] ease-in-out hover:scale-102"
              
            >
              Entrar
            </button>
          </div>
        </form>

        <p
          className={`text-center text-sm text-gray-600 mt-6 transition-all duration-[700ms] ease-out delay-[1150ms] ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Não tem conta?{" "}
          <a href="/Cadastro" className="text-blue-600 hover:underline font-medium">
            Cadastre-se
          </a>
        </p>

        <p
          className={`text-center text-sm text-gray-600 mt-2 transition-all duration-[700ms] ease-out delay-[1250ms] ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Esqueceu a senha?{" "}
          <a href="/RecuperarSenha" className="text-blue-600 hover:underline font-medium">
            Recuperar Senha
          </a>
        </p>
      </div>

      <h2
        className={`block mb-2 mt-6 text-base font-medium text-black p-1 transition-all duration-[700ms] ease-out delay-[1350ms] ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        Desenvolvido por: <span className="font-semibold">Irmãos Metralha</span>
      </h2>
    </div>
  );
}