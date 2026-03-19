from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from .models import Usuario, Produto, Movimentacao
from .serializers import UsuarioSerializer, ProdutoSerializer, MovimentacaoSerializer


class UsuarioListCreate(ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [AllowAny]

class ProductListCreate(ListCreateAPIView):
    queryset = Produto.objects.all().order_by("nome")
    serializer_class = ProdutoSerializer
    permission_classes = [AllowAny] 


class ProductRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer
    permission_classes = [AllowAny]
    lookup_field = "id_produto"

class MovementListCreate(ListCreateAPIView):
    queryset = Movimentacao.objects.all().order_by("-data_mov")
    serializer_class = MovimentacaoSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        try:
            usuario = Usuario.objects.first()

            serializer.save(usuario=usuario)

        except Exception as e:
            raise Exception(str(e))


class MovementRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Movimentacao.objects.all()
    serializer_class = MovimentacaoSerializer
    permission_classes = [AllowAny]
    lookup_field = "id_movimentacao"