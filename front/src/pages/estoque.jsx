import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/estoque.css";

export default function Estoque() {
  const [produtos, setProdutos] = useState([]);
  const [mov, setMov] = useState({
    produto: "",
    tipo: "entrada",
    data: "",
    quantidade: "",
  });

  const navigate = useNavigate();

  const carregar = async () => {
    try {
      const res = await api.get("produtos/");

      const ordenado = res.data.sort((a, b) =>
        a.nome.localeCompare(b.nome)
      );

      setProdutos(ordenado);
    } catch (error) {
      console.log(error);
      alert("Erro ao carregar produtos");
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const movimentar = async () => {
    if (!mov.produto || !mov.data || !mov.quantidade) {
      alert("Preencha todos os campos");
      return;
    }

    console.log({
      produto: Number(mov.produto),
      tipo: mov.tipo,
      data: mov.data,
      quantidade: Number(mov.quantidade),
    });
    try {
      await api.post("movimentacoes/", {
        produto: Number(mov.produto), 
        tipo: mov.tipo,
        data: mov.data,
        quantidade: Number(mov.quantidade), 
      });

      alert("Movimentação registrada com sucesso!");

      if (mov.tipo === "saida") {
        alert("Verifique se o estoque está abaixo do mínimo!");
      }

      setMov({
        produto: "",
        tipo: "entrada",
        data: "",
        quantidade: "",
      });

    } catch (error) {
      console.log(error);
      alert("Erro ao registrar movimentação");
    }
  };

  console.log({
      produto: Number(mov.produto),
      tipo: mov.tipo,
      data: mov.data,
      quantidade: Number(mov.quantidade),
    });

  return (
    <div className="estoque-container">
      <div className="estoque-box">

        <h2>Gestão de Estoque</h2>

        {/* PRODUTO */}
        <select
          value={mov.produto}
          onChange={(e) =>
            setMov({ ...mov, produto: e.target.value })
          }
        >
          <option value="">Selecione um produto</option>
          {produtos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome}
            </option>
          ))}
        </select>

        {/* TIPO */}
        <select
          value={mov.tipo}
          onChange={(e) =>
            setMov({ ...mov, tipo: e.target.value })
          }
        >
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>

        {/* DATA */}
        <input
          type="date"
          value={mov.data}
          onChange={(e) =>
            setMov({ ...mov, data: e.target.value })
          }
        />

        {/* QUANTIDADE */}
        <input
          type="number"
          placeholder="Quantidade"
          value={mov.quantidade}
          onChange={(e) =>
            setMov({ ...mov, quantidade: e.target.value })
          }
        />

        {/* BOTÃO PRINCIPAL */}
        <button onClick={movimentar}>
          Registrar
        </button>

        {/* VOLTAR */}
        <button
          className="btn-voltar"
          onClick={() => navigate("/home")}
        >
          Voltar
        </button>

      </div>
    </div>
  );
}