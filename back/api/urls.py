from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import (
    UsuarioListCreate,
    ProductListCreate,
    ProductRetrieveUpdateDestroy,
    MovementListCreate,
    MovementRetrieveUpdateDestroy,
)

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('usuario/', UsuarioListCreate.as_view(), name='usuario'),

    path('produtos/', ProductListCreate.as_view(), name='produtos'),
    path('produtos/<int:pk>/', ProductRetrieveUpdateDestroy.as_view(), name='produto-detail'),

    path('movimentacoes/', MovementListCreate.as_view(), name='movimentacoes'),
    path('movimentacoes/<int:id_movimentacao>/', MovementRetrieveUpdateDestroy.as_view(), name='movimentacao-detail'),
]