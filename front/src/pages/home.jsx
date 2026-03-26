import { useNavigate } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="home-container">

      <h2 className="home-title">Bem-vindo, {user}</h2>

      {/* CARDS */}
      <div className="home-cards">

        <div className="home-card">
          <h3>Produtos</h3>
          <span>Gerencie os produtos cadastrados</span>

          <div className="home-actions">
            <button onClick={() => navigate("/produtos")}>
              Acessar
            </button>
          </div>
        </div>

        <div className="home-card">
          <h3>Estoque</h3>
          <span>Controle entradas e saídas</span>

          <div className="home-actions">
            <button onClick={() => navigate("/estoque")}>
              Acessar
            </button>
          </div>
        </div>

      </div>

      {/* LOGOUT */}
      <div className="home-actions">
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

    </div>
  );
}