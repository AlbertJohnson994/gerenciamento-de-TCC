// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { login, clearError } from "../../store/authSlice";
// import type { RootState, AppDispatch } from "../../store";
// import type { LoginData } from "../../services/authService";

// const Login: React.FC = () => {
//   const [formData, setFormData] = useState<LoginData>({
//     email: "",
//     password: "",
//   });

//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate(); // Hook para navegação
//   const { isLoading, error, token, user } = useSelector(
//     (state: RootState) => state.auth
//   );

//   // Redirecionar se já estiver logado
//   useEffect(() => {
//     if (token) {
//       navigate("/dashboard");
//     }
//   }, [token, navigate]);

//   useEffect(() => {
//     const checkAuth = () => {
//       const storedToken = localStorage.getItem("token");
//       const storedUser = localStorage.getItem("user");

//       console.log("Stored token:", storedToken);
//       console.log("Stored user:", storedUser);
//       console.log("Redux token:", token);
//       console.log("Redux user:", user);

//       if (storedToken) {
//         console.log("Redirecting to dashboard from stored token");
//         navigate("/dashboard");
//       } else if (token) {
//         console.log("Redirecting to dashboard from redux token");
//         navigate("/dashboard");
//       }
//     };

//     checkAuth();
//   }, [token, user, navigate]);

//   // Redirecionar após login bem-sucedido
//   useEffect(() => {
//     dispatch(clearError());
//   }, [dispatch]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       console.log("Attempting login with:", formData);
//       const result = await dispatch(login(formData)).unwrap();
//       console.log("Login successful, result:", result);
//       console.log("Token in state after login:", token);
//       console.log("User in state after login:", user);
//       navigate("/dashboard"); // Redireciona para dashboard
//     } catch (error) {
//       console.error("Erro no login:", error);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Se já estiver logado, não mostra o formulário
//   if (token) {
//     return (
//       <div className="loading">
//         <p>Redirecionando para o dashboard...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="form-container">
//       <form onSubmit={handleSubmit}>
//         <h2>Login</h2>

//         {error && <div className="error-message">{error}</div>}

//         <div className="form-group">
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Senha:</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <button type="submit" className="btn btn-primary" disabled={isLoading}>
//           {isLoading ? "Carregando..." : "Entrar"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, clearError } from "../../store/authSlice";
import type { RootState, AppDispatch } from "../../store";
import type { LoginData } from "../../services/authService";

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error, token } = useSelector(
    (state: RootState) => state.auth
  );

  // Clear error on mount
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(login(formData)).unwrap();
      console.log("Login successful:", result);
      // After successful login, redirect to dashboard
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Show loading message if already logged in
  if (token) {
    return (
      <div className="loading">
        <p>Redirecionando para o dashboard...</p>
      </div>
    );
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Senha:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Carregando..." : "Entrar"}
        </button>

        <p
          style={{ cursor: "pointer", color: "#007bff", marginTop: "12px" }}
          onClick={() => navigate("/forgot-password")}
        >
          Esqueci minha senha
        </p>
      </form>
    </div>
  );
};

export default Login;
