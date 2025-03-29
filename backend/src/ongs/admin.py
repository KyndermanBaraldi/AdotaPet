from django.contrib import admin
from .models import Ong

@admin.register(Ong)
class OngAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'state', 'postal_code', 'user')
    list_filter = ('state', 'city')
    search_fields = ('name', 'postal_code', 'user__username')

    fieldsets = [
        ("Informações Básicas", {
            "fields": ["user", "name", "email", "phone"],
        }),
        ("Endereço", {
            "fields": ["address_line1", "address_number", "neighborhood", "city", "state", "postal_code"],
        }),
    ]

    def get_queryset(self, request):
        """Restringe a visualização apenas às ONGs do usuário logado, exceto para superusuários."""
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs  # Superusuário vê tudo
        return qs.filter(user=request.user)

    def has_change_permission(self, request, obj=None):
        """Restringe a edição apenas ao dono do registro ou ao superusuário."""
        if obj is None:
            return True
        return obj.user == request.user or request.user.is_superuser

    def has_delete_permission(self, request, obj=None):
        """Restringe a exclusão apenas ao dono do registro ou ao superusuário."""
        if obj is None:
            return True
        return obj.user == request.user or request.user.is_superuser

    def has_view_permission(self, request, obj=None):
        """Garante que apenas o dono possa visualizar os detalhes, exceto para superusuários."""
        if obj is None:
            return True
        return obj.user == request.user or request.user.is_superuser

    def get_fieldsets(self, request, obj=None):
        """Esconde o campo 'user' para usuários não superusuários e atribui automaticamente o usuário ativo."""
        fieldsets = super().get_fieldsets(request, obj)
        if not request.user.is_superuser:
            # Remover o campo 'user' para usuários não superusuários
            fieldsets[0][1]["fields"] = [field for field in fieldsets[0][1]["fields"] if field != "user"]
        return fieldsets

    def save_model(self, request, obj, form, change):
        """Define automaticamente o usuário ativo como o dono da ONG para usuários não superusuários."""
        if not request.user.is_superuser:
            obj.user = request.user  # Atribui o usuário ativo à ONG
        super().save_model(request, obj, form, change)