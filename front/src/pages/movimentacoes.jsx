import { useEffect, useState } from "react";
import "../styles/movimentacoes.css";

function Movimentacao() {
  const [dados, setDados] = useState([]);
  const [produto, setProduto] = useState("");
  const [qtd, setQtd] = useState("");
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    carregarDados();
    carregarProdutos();
  }, []);

  function carregarDados() {
    fetch("http://127.0.0.1:8000/api/movimentacoes/")
      .then(res => res.json())
      .then(data => setDados(data));
  }

  function carregarProdutos() {
    fetch("http://127.0.0.1:8000/api/produtos/")
      .then(res => res.json())
      .then(data => setProdutos(data));
  }

  function cadastrar(e) {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/api/movimentacoes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        produto: Number(produto),
        quantidade: Number(qtd)
      })
    })
    .then(() => {
      alert("Movimentação cadastrada!");
      carregarDados(); // melhor que reload
    });
  }

  return (
    <div className="mov-container">
      <h1>Movimentações</h1>

      {/* FORM */}
      <form onSubmit={cadastrar} className="form">

        {/* SELECT PRODUTO */}
        <select onChange={e => setProduto(e.target.value)}>
          <option value="">Selecione o produto</option>
          {produtos.map(p => (
            <option key={p.id} value={p.id}>
              {p.nome}
            </option>
          ))}
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
            <th>Quantidade</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {dados.map((item) => (
            <tr key={item.id}>
              <td>{item.produto_nome}</td>
              <td>{item.quantidade}</td>
              <td>{new Date(item.data).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Movimentacao;