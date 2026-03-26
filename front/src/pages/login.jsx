import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const logar = async (e) => {
    e.preventDefault();

    console.log("username: ", username);
    console.log("password: ", password);
    
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        login: username,
        password: password
      });

      console.log("Response: ", response.data);

      localStorage.setItem('token', response.data.access);

      localStorage.setItem('user', username);

      navigate('/home');

    } catch (error) {
      console.log(error);
      alert("Erro no login");
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={logar}>
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Usuário"
          onChange={e => setUsername(e.target.value)}
          value={username}
        />

        <input
          type="password"
          placeholder="Senha"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;