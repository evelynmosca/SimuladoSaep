import { useEffect, useState } from "react";
import "../styles/movimentacoes.css";

function Movimentacao() {
  const [dados, setDados] = useState([]);
  const [produto, setProduto] = useState("");
  const [tipo, setTipo] = useState("Entrada");
  const [qtd, setQtd] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/movimentacoes/")
      .then(res => res.json())
      .then(data => setDados(data));
  }, []);

  function cadastrar(e) {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/api/movimentacoes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        produto,
        tipo,
        qtd
      })
    })
    .then(() => {
      alert("Movimentação cadastrada!");
      window.location.reload();
    });
  }

  return (
    <div className="mov-container">
      <h1>Movimentações</h1>

      {/* FORM */}
      <form onSubmit={cadastrar} className="form">
        <input
          type="text"
          placeholder="Produto"
          onChange={e => setProduto(e.target.value)}
        />

        <select onChange={e => setTipo(e.target.value)}>
          <option>Entrada</option>
          <option>Saída</option>
        </select>

        <input
          type="number"
          placeholder="Quantidade"
          onChange={e => setQtd(e.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </form>

      {/* TABELA */}
      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Tipo</th>
            <th>Quantidade</th>
          </tr>
        </thead>

        <tbody>
          {dados.map((item, index) => (
            <tr key={index}>
              <td>{item.produto}</td>
              <td>{item.tipo}</td>
              <td>{item.qtd}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Movimentacao;