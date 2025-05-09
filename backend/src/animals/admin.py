from django.contrib.gis import admin
from leaflet.admin import LeafletGeoAdmin
from .models import Animal, AnimalPhoto

class PhotoInline(admin.TabularInline):
    model = AnimalPhoto
    extra = 1

@admin.register(Animal)
class AnimalAdmin(LeafletGeoAdmin): 
    list_display = ('name', 'species', 'breed', 'age', 'is_adopted', 'city', 'state', 'ong')
    list_filter = ('species', 'is_adopted', 'ong__name', 'city', 'state')
    search_fields = ('name', 'species', 'breed', 'city', 'state', 'ong__name')
    inlines = [PhotoInline]

    # Configuração do Leaflet
    settings_overrides = {
        'DEFAULT_CENTER': (-22.9467, -45.5467),  # Tremembé/SP
        'DEFAULT_ZOOM': 12,
    }

    # Organizando os campos no Django Admin
    fieldsets = [
        ("Informações do Animal", {
            "fields": ["ong", ("name", "species"), ("breed", "age"), "description", "is_adopted"]
        }),
        
        ("Endereço", {
            "fields": [("state", "city"), "location"]
        }),
  
    ]

    def get_form(self, request, obj=None, **kwargs):
        """Filtra o campo 'ong' para mostrar apenas as ONGs do usuário logado."""
        form = super().get_form(request, obj, **kwargs)
        
        if not request.user.is_superuser:
            # Filtra o queryset das ONGs para mostrar apenas as ONGs do usuário logado
            form.base_fields['ong'].queryset = form.base_fields['ong'].queryset.filter(user=request.user)
        
        return form
    def get_queryset(self, request):
        """Restringe a visualização apenas aos animais da ONG do usuário logado, exceto para superusuários."""
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs  # Superusuário vê tudo
        return qs.filter(ong__user=request.user)

    def has_change_permission(self, request, obj=None):
        """Permite edição apenas se o usuário for dono da ONG vinculada ou superusuário."""
        if obj is None:
            return True
        return obj.ong.user == request.user or request.user.is_superuser

    def has_delete_permission(self, request, obj=None):
        """Permite exclusão apenas se o usuário for dono da ONG vinculada ou superusuário."""
        if obj is None:
            return True
        return obj.ong.user == request.user or request.user.is_superuser

    def has_view_permission(self, request, obj=None):
        """Permite visualização apenas se o usuário for dono da ONG vinculada ou superusuário."""
        if obj is None:
            return True
        return obj.ong.user == request.user or request.user.is_superuser
   
    class Media:
        js = ("js/animal_ibge.js",)