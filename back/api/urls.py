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
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('usuarios/', UsuarioListCreate.as_view()),

    path('produtos/', ProductListCreate.as_view()),
    path('produtos/<int:id_produto>/', ProductRetrieveUpdateDestroy.as_view()),

    path('movimentacoes/', MovementListCreate.as_view()),
    path('movimentacoes/<int:id_movimentacao>/', MovementRetrieveUpdateDestroy.as_view()),
]