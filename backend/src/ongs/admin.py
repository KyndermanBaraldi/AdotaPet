from django.contrib import admin
from .models import Ong

@admin.register(Ong)
class OngAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'state', 'postal_code', 'user')
    list_filter = ('state', 'city')
    search_fields = ('name', 'postal_code', 'user__username')
    # Opcional: Personalizar rótulos dos campos no formulário
    fieldsets = [
        ("Informações Básicas", {
            "fields": ["user", "name", "email", "phone"],
        }),
        ("Endereço", {
            "fields": ["address_line1", "address_number", "neighborhood", "city", "state", "postal_code"],
        }),
    ]