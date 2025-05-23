# Generated by Django 5.1.7 on 2025-03-22 21:38

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Ong',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Nome')),
                ('address_line1', models.CharField(max_length=200, verbose_name='Logradouro')),
                ('address_number', models.CharField(max_length=10, verbose_name='Número')),
                ('neighborhood', models.CharField(max_length=100, verbose_name='Bairro')),
                ('city', models.CharField(max_length=100, verbose_name='Cidade')),
                ('state', models.CharField(max_length=2, verbose_name='Estado')),
                ('postal_code', models.CharField(max_length=9, verbose_name='CEP')),
                ('phone', models.CharField(max_length=20, verbose_name='Telefone')),
                ('email', models.EmailField(max_length=254, verbose_name='E-mail')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Data de criação')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Última atualização')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Usuário')),
            ],
            options={
                'verbose_name': 'ONG',
                'verbose_name_plural': 'ONGs',
            },
        ),
        migrations.CreateModel(
            name='Animal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Nome')),
                ('species', models.CharField(max_length=50, verbose_name='Espécie')),
                ('breed', models.CharField(blank=True, max_length=50, null=True, verbose_name='Raça')),
                ('age', models.IntegerField(verbose_name='Idade')),
                ('description', models.TextField(verbose_name='Descrição')),
                ('is_adopted', models.BooleanField(default=False, verbose_name='Adotado')),
                ('latitude', models.FloatField(blank=True, null=True, verbose_name='Latitude')),
                ('longitude', models.FloatField(blank=True, null=True, verbose_name='Longitude')),
                ('city', models.CharField(max_length=100, verbose_name='Cidade')),
                ('state', models.CharField(max_length=2, verbose_name='Estado')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Data de cadastro')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Última atualização')),
                ('ong', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ongs.ong', verbose_name='ONG')),
            ],
            options={
                'verbose_name': 'Animal',
                'verbose_name_plural': 'Animais',
            },
        ),
    ]
