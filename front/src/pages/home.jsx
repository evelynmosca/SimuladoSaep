import { useEffect, useState } from "react";
import "../styles/home.css";

function Home() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/produtos/")
      .then(res => res.json())
      .then(data => setProdutos(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="content">
      <h1>Produtos</h1>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p, i) => (
            <tr key={i}>
              <td>{p.nome}</td>
              <td>{p.qtd}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;