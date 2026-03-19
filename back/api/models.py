from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import transaction
from datetime import date

class UsuarioManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, login, password=None, **extra_fields):
        if not login:
            raise ValueError("O campo login é obrigatório.")

        usuario = self.model(login=login, **extra_fields)

        if password:
            usuario.set_password(password)
        else:
            usuario.set_unusable_password()

        usuario.save(using=self._db)
        return usuario

    def create_superuser(self, login, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if not password:
            raise ValueError("Superusuário deve ter senha.")

        return self.create_user(login, password, **extra_fields)

class Usuario(AbstractBaseUser, PermissionsMixin):
    # id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=150)
    login = models.CharField(max_length=100, unique=True)
    senha = models.CharField(max_length=100)


    USERNAME_FIELD = "login"
    REQUIRED_FIELDS = ["nome"]

    objects = UsuarioManager()

    class Meta:
        db_table = "usuarios"

    def __str__(self):
        return self.login


class Produto(models.Model):
    id_produto = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=200)
    descricao = models.TextField(blank=True, null=True)
    estoque_atual = models.IntegerField(default=0)
    estoque_minimo = models.IntegerField(default=0)

    class Meta:
        db_table = "produtos"

    def __str__(self):
        return self.nome

class Movimentacao(models.Model):
    TIPO_CHOICES = (
        ("entrada", "Entrada"),
        ("saida", "Saída"),
    )

    id_movimentacao = models.AutoField(primary_key=True)

    produto = models.ForeignKey(
        Produto, on_delete=models.CASCADE, db_column="id_produto"
    )

    usuario = models.ForeignKey(
        Usuario, on_delete=models.CASCADE, db_column="id_usuario"
    )

    tipo = models.CharField(max_length=10, choices=TIPO_CHOICES)

    quantidade = models.PositiveIntegerField() 

    data_mov = models.DateField(default=date.today)

    class Meta:
        db_table = "movimentacoes"

    def __str__(self):
        return f"{self.produto.nome} - {self.tipo} ({self.quantidade})"

    @transaction.atomic
    def save(self, *args, **kwargs):
        produto = Produto.objects.select_for_update().get(pk=self.produto.pk)

        if self.tipo == "saida":
            if produto.estoque_atual < self.quantidade:
                raise ValueError("Estoque insuficiente")

        super().save(*args, **kwargs)

        if self.tipo == "entrada":
            produto.estoque_atual += self.quantidade
        else:
            produto.estoque_atual -= self.quantidade

        produto.save()