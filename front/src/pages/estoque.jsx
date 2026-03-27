import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/estoque.css";

export default function Estoque() {
  const [produtos, setProdutos] = useState([]);
  const [mov, setMov] = useState({
    produto: "",
    tipo: "entrada",
    data_mov: "", // Nome da variável alterado aqui
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
    if (!mov.produto || !mov.quantidade) {
      alert("Preencha produto e quantidade");
      return;
    }

    try {
      const payload = {
        produto: Number(mov.produto),
        tipo: mov.tipo,
        quantidade: Number(mov.quantidade),
        // Certifique-se de que o seu serializer no Django também 
        // espera o nome 'data_mov' caso você não use auto_now_add
        data_mov: mov.data_mov, 
      };

      await api.post("movimentacoes/", payload);

      alert("Movimentação registrada e estoque atualizado!");

      // Limpa os campos após o sucesso
      setMov({ 
        produto: "", 
        tipo: "entrada", 
        data_mov: "", 
        quantidade: "" 
      });
      
      // Recarrega a lista para atualizar o saldo do estoque na tela
      carregar(); 

    } catch (error) {
      console.error("Erro retornado pelo Django:", error.response?.data);
      // Mostra o erro real para facilitar o debug
      alert("Erro ao registrar: " + JSON.stringify(error.response?.data));
    }
  };

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
              {p.nome} (Qtd: {p.estoque_atual})
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
          value={mov.data_mov} // Variável alterada aqui
          onChange={(e) =>
            setMov({ ...mov, data_mov: e.target.value })
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