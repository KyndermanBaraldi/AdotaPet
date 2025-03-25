from django.contrib.gis import admin
from leaflet.admin import LeafletGeoAdmin
from .models import Animal, AnimalPhoto

class PhotoInline(admin.TabularInline):
    model = AnimalPhoto
    extra = 1

@admin.register(Animal)
class AnimalAdmin(LeafletGeoAdmin): 
    list_display = ('name', 'species', 'breed', 'age', 'is_adopted', 'city', 'state')
    list_filter = ('species', 'is_adopted', 'ong__name', 'city', 'state')
    search_fields = ('name', 'species', 'breed', 'city', 'state')
    inlines = [PhotoInline]
    
    # Configuração do Leaflet
    settings_overrides = {
        'DEFAULT_CENTER': (-22.9467, -45.5467),  # Tremembé/SP
        'DEFAULT_ZOOM': 12,
    }

    # Campos para edição
    fields = [
        ('name', 'species'),
        ('breed', 'age'),
        'description',
        ('city', 'state'),
        'is_adopted',
        'ong',
        'location'
    ]