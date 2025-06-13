import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/gym";
import { useUser } from "../hooks/useUser";
import "../styles/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await service.login({ username, password });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error en el login");
      }

      setUser(data);
      service.setToken(data.token);
      window.localStorage.setItem("loggedUser", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      console.error("Error durante el login:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Bienvenido</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label htmlFor="username">Usuario</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}

export default Login;
