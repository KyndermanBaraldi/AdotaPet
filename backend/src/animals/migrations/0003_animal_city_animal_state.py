# Generated by Django 5.1.7 on 2025-03-25 02:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('animals', '0002_remove_animal_city_remove_animal_latitude_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='animal',
            name='city',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Cidade'),
        ),
        migrations.AddField(
            model_name='animal',
            name='state',
            field=models.CharField(blank=True, max_length=2, null=True, verbose_name='Estado'),
        ),
    ]
