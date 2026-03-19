from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import (
    UsuarioListCreate,
    ProductListCreate,
    ProductRetrieveUpdateDestroy,
    MovementListCreate,
    MovementRetrieveUpdateDestroy
)

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('login/refresh/', TokenRefreshView.as_view(), name='refresh'),

    path('usuarios/', UsuarioListCreate.as_view(), name='usuarios'),

    path('produtos/', ProductListCreate.as_view(), name='produtos'),
    path('produtos/<int:id_produto>/', ProductRetrieveUpdateDestroy.as_view(), name='produto-detail'),

    path('movimentacoes/', MovementListCreate.as_view(), name='movimentacoes'),
    path('movimentacoes/<int:id_movimentacao>/', MovementRetrieveUpdateDestroy.as_view(), name='movimentacao-detail'),
]