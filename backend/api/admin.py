from django.contrib import admin
from .models import Produto, Usuario, Movimentacao

admin.site.register(Produto)
admin.site.register(Usuario)
admin.site.register(Movimentacao)