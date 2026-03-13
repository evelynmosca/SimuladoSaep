from django.db import models

class Usuario(models.Model):
    nome = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    senha = models.CharField(max_length=100)

    def __str__(self):
        return self.nome

class Produto(models.Model):
    nome = models.CharField(max_length=100)
    tipo = models.CharField(max_length=50)
    material = models.CharField(max_length=50)
    peso = models.FloatField()
    tamanho = models.CharField(max_length=50)
    estoque_atual = models.IntegerField()
    estoque_minimo = models.IntegerField()
    descricao = models.TextField()

    def __str__(self):
        return self.nome

class Movimentacao(models.Model):
    TIPO_CHOICES = [
        ('entrada', 'Entrada'),
        ('saida', 'Saida')
    ]

    tipo_movimentacao = models.CharField(max_length=10, choices=TIPO_CHOICES)
    quantidade = models.IntegerField()
    data_movimentacao = models.DateField()
    produto = models.ForeignKey(Produto, on_delete=models.CASCADE)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)