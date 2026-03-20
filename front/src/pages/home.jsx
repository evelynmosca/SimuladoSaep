import { useEffect, useState } from "react";
import "../styles/home.css";
import axios from "axios";

function Home() {
  const [produtos, setProdutos] = useState([]);
  const token = localStorage.getItem('token');

  const carregarProdutos = async () => {
    try {
      const response = await axios.get(
        'http://127.0.0.1:8000/api/produtos/',
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setProdutos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  return (
    <div className="content">
      <h1>Produtos</h1>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Estoque Atual</th>
            <th>Estoque Mínimo</th>
          </tr>
        </thead>

        <tbody>
          {produtos.map((p) => (
            <tr key={p.id}>
              <td>{p.nome}</td>
              <td>R$ {p.preco}</td>
              <td>{p.estoque_atual}</td>
              <td>{p.estoque_minimo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;