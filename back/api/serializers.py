from rest_framework import serializers
from .models import Usuario, Produto, Movimentacao

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ["id", "nome", "login"] 


class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = ["id", "nome", "preco", "descricao", 'estoque_atual','estoque_minimo']


class MovimentacaoSerializer(serializers.ModelSerializer):
    produto_nome = serializers.ReadOnlyField(source="produto.nome")

    class Meta:
        model = Movimentacao
        fields = [
            "id",
            "produto",
            "produto_nome",
            "tipo", 
            "quantidade",
            "data_mov",
        ]
        read_only_fields = ["data_mov"]