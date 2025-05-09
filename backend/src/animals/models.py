from django.contrib.gis.db import models
from cloudinary.models import CloudinaryField
from ongs.models import Ong

class Animal(models.Model):
    ong = models.ForeignKey(Ong, on_delete=models.CASCADE, verbose_name="ONG")
    name = models.CharField(max_length=100, verbose_name="Nome")
    species = models.CharField(max_length=50, verbose_name="Espécie")
    breed = models.CharField(max_length=50, blank=True, null=True, verbose_name="Raça")
    age = models.IntegerField(verbose_name="Idade")
    description = models.TextField(verbose_name="Descrição")
    is_adopted = models.BooleanField(default=False, verbose_name="Adotado")
    state = models.CharField(verbose_name="Estado (UF)", blank=True, null=True, max_length=2, choices=[
        ('AC', 'Acre'), ('AL', 'Alagoas'), ('AP', 'Amapá'), ('AM', 'Amazonas'),
        ('BA', 'Bahia'), ('CE', 'Ceará'), ('DF', 'Distrito Federal'), ('ES', 'Espírito Santo'),
        ('GO', 'Goiás'), ('MA', 'Maranhão'), ('MT', 'Mato Grosso'), ('MS', 'Mato Grosso do Sul'),
        ('MG', 'Minas Gerais'), ('PA', 'Pará'), ('PB', 'Paraíba'), ('PR', 'Paraná'),
        ('PE', 'Pernambuco'), ('PI', 'Piauí'), ('RJ', 'Rio de Janeiro'), ('RN', 'Rio Grande do Norte'),
        ('RS', 'Rio Grande do Sul'), ('RO', 'Rondônia'), ('RR', 'Roraima'), ('SC', 'Santa Catarina'),
        ('SP', 'São Paulo'), ('SE', 'Sergipe'), ('TO', 'Tocantins')
    ])
    city = models.CharField(max_length=100, blank=True, null=True, verbose_name="Cidade")
        
    # Campo geográfico
    location = models.PointField(
        geography=True,
        blank=True,
        null=True,
        verbose_name="Localização",
        help_text="Clique no mapa para selecionar a localização"
    )
    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Data de cadastro")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Última atualização")

    class Meta:
        verbose_name = "Animal"
        verbose_name_plural = "Animais"

    def __str__(self):
        return self.name

class AnimalPhoto(models.Model):
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE, related_name='photos')
    photo = CloudinaryField(
        'Foto', 
        folder='animais/photos/', 
        blank=True, 
        null=True
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Foto do Animal"
        verbose_name_plural = "Fotos dos Animais"

    def __str__(self):
        return f"Foto de {self.animal.name}"
