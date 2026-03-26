import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/produtos.css";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [novo, setNovo] = useState({ nome: "", preco: "" });
  const [editando, setEditando] = useState(null);

  const navigate = useNavigate();

  const carregar = async () => {
    try {
      const res = await api.get("produtos/");
      setProdutos(res.data);
    } catch (error) {
      console.log(error);
      alert("Erro ao carregar produtos");
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const buscar = async () => {
    try {
      const res = await api.get(`produtos/?search=${busca}`);
      setProdutos(res.data);
    } catch (error) {
      console.log(error);
      alert("Erro na busca");
    }
  };

  const criarOuEditar = async () => {
    if (!novo.nome || !novo.preco) {
      alert("Preencha todos os campos");
      return;
    }

    if (Number(novo.preco) <= 0) {
      alert("Preço inválido");
      return;
    }

    try {
      const payload = {
        nome: novo.nome,
        preco: Number(novo.preco),
      };

      if (editando) {
        await api.put(`produtos/${editando}/`, payload);
        alert("Produto atualizado!");
      } else {
        await api.post("produtos/", payload);
        alert("Produto cadastrado!");
      }

      setNovo({ nome: "", preco: "" });
      setEditando(null);
      carregar();

    } catch (error) {
      console.log(error);
      alert("Erro ao salvar produto");
    }
  };

  const deletar = async (id) => {
    if (!window.confirm("Deseja excluir este produto?")) return;

    try {
      await api.delete(`produtos/${id}/`);
      carregar();
    } catch (error) {
      console.log(error);
      alert("Erro ao excluir");
    }
  };

  const iniciarEdicao = (produto) => {
    setNovo({
      nome: produto.nome,
      preco: produto.preco,
    });
    setEditando(produto.id);
  };

  return (
    <div className="produtos-container">

      <h2>Produtos</h2>

      {/* TOPO */}
      <div className="top-bar">

        {/* BUSCA */}
        <div className="top-bar-left">
          <input
            placeholder="Buscar produto..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <button onClick={buscar}>Buscar</button>
        </div>

        {/* BOTÃO NOVO */}
        <button onClick={() => {
          setNovo({ nome: "", preco: "" });
          setEditando(null);
        }}>
          + Novo Produto
        </button>

      </div>

      {/* FORM */}
      <div className="top-bar">
        <input
          placeholder="Nome"
          value={novo.nome}
          onChange={(e) => setNovo({ ...novo, nome: e.target.value })}
        />

        <input
          type="number"
          placeholder="Preço"
          value={novo.preco}
          onChange={(e) => setNovo({ ...novo, preco: e.target.value })}
        />

        <button onClick={criarOuEditar}>
          {editando ? "Atualizar" : "Adicionar"}
        </button>
      </div>

      {/* TABELA */}
      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {produtos.map((p) => (
            <tr key={p.id}>
              <td>{p.nome}</td>
              <td>R$ {Number(p.preco).toFixed(2)}</td>

              <td>
                <button onClick={() => iniciarEdicao(p)}>
                  Editar
                </button>

                <button
                  className="btn-delete"
                  onClick={() => deletar(p.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* VOLTAR */}
      <button
        className="btn-voltar"
        onClick={() => navigate("/home")}
      >
        Voltar
      </button>

    </div>
  );
}