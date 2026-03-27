from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView
from django.shortcuts import get_object_or_404
from .models import *
from .serializers import *


class UsuarioListCreate(ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [AllowAny]


class ProductListCreate(ListCreateAPIView):
    queryset = Produto.objects.all().order_by("nome")
    serializer_class = ProdutoSerializer
    permission_classes = [IsAuthenticated]  

class ProductRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer
    permission_classes = [IsAuthenticated]

class MovementListCreate(generics.ListCreateAPIView):
    queryset = Movimentacao.objects.all().order_by("-data_mov")
    serializer_class = MovimentacaoSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        produto_id = self.request.data.get('produto')
        quantidade = int(self.request.data.get('quantidade'))
        tipo = self.request.data.get('tipo')

        produto = get_object_or_404(Produto, id=produto_id)

        if tipo == 'entrada':
            produto.estoque_atual += quantidade
        elif tipo == 'saida':
            produto.estoque_atual -= quantidade

        produto.save()

        serializer.save()


class MovementRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Movimentacao.objects.all()
    serializer_class = MovimentacaoSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "id_movimentacao"
    