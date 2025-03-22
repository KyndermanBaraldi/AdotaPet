from django.contrib import admin
from .models import Animal

@admin.register(Animal)
class AnimalAdmin(admin.ModelAdmin):
    list_display = ('name', 'species', 'breed', 'age', 'is_adopted', 'city', 'state')
    list_filter = ('species', 'is_adopted', 'state')
    search_fields = ('name', 'species', 'breed')
    # Opcional: Personalizar rótulos dos campos no formulário
    fieldsets = [
        ("Informações Básicas", {
            "fields": ["ong", "name", "species", "breed", "age", "description"],
        }),
        ("Localização", {
            "fields": ["latitude", "longitude", "city", "state"],
        }),
        ("Status", {
            "fields": ["is_adopted"],
        }),
    ]