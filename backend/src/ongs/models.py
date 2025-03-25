from django.contrib.gis.db import models
from django.contrib.auth.models import User

class Ong(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Usuário")
    name = models.CharField(max_length=100, verbose_name="Nome")
    address_line1 = models.CharField(max_length=200, verbose_name="Logradouro")
    address_number = models.CharField(max_length=10, verbose_name="Número")
    neighborhood = models.CharField(max_length=100, verbose_name="Bairro")
    city = models.CharField(max_length=100, verbose_name="Cidade")
    state = models.CharField(max_length=2, verbose_name="Estado")
    postal_code = models.CharField(max_length=9, verbose_name="CEP")
    phone = models.CharField(max_length=20, verbose_name="Telefone")
    email = models.EmailField(verbose_name="E-mail")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Data de criação")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Última atualização")

    class Meta:
        verbose_name = "ONG"
        verbose_name_plural = "ONGs"

    def __str__(self):
        return self.name
