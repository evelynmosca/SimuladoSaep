from rest_framework import serializers
from .models import Usuario, Produto, Movimentacao

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ["id", "nome", "login"] 


class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = ["id", "nome", "preco", "estoque"]


class MovimentacaoSerializer(serializers.ModelSerializer):
    produto_nome = serializers.ReadOnlyField(source="produto.nome")

    class Meta:
        model = Movimentacao
        fields = [
            "id",
            "produto",
            "produto_nome",
            "quantidade",
            "data",
        ]
        read_only_fields = ["data"]