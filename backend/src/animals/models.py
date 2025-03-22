from django.db import models
from ongs.models import Ong

class Animal(models.Model):
    ong = models.ForeignKey(Ong, on_delete=models.CASCADE, verbose_name="ONG")
    name = models.CharField(max_length=100, verbose_name="Nome")
    species = models.CharField(max_length=50, verbose_name="Espécie")
    breed = models.CharField(max_length=50, blank=True, null=True, verbose_name="Raça")
    age = models.IntegerField(verbose_name="Idade")
    description = models.TextField(verbose_name="Descrição")
    is_adopted = models.BooleanField(default=False, verbose_name="Adotado")
    latitude = models.FloatField(null=True, blank=True, verbose_name="Latitude")
    longitude = models.FloatField(null=True, blank=True, verbose_name="Longitude")
    city = models.CharField(max_length=100, verbose_name="Cidade")
    state = models.CharField(max_length=2, verbose_name="Estado")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Data de cadastro")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Última atualização")

    class Meta:
        verbose_name = "Animal"
        verbose_name_plural = "Animais"

    def __str__(self):
        return self.name
