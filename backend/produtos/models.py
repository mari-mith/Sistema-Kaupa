from django.db import models

class Produto(models.Model):
    imagem = models.ImageField(upload_to='produtos/', null=True, blank=True)
    nome = models.CharField(max_length=200)
    descricao = models.TextField()
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    quantidade = models.IntegerField()

    def __str__(self):
        return self.nome
