import { useEffect, useState } from "react";
import "../styles/home.css";
import axios from "axios";

function Home() {
  const [produtos, setProdutos] = useState([]);
  const token = localStorage.getItem('token')

  const logar = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/produtos/', {
        headers: { Authorization: `Bearer ${token}` }
      })

      setProdutos(response.data)
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    logar()
  }, []);

  return (
    <div className="content">
      <h1>Produtos</h1>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p, i) => (
            <tr key={i}>
              <td>{p.nome}</td>
              <td>{p.qtd}</td>
              <td>{p.tipo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;