JAZZMIN_SETTINGS = {
    # Configurações Gerais
    "site_title": "AdotaPet",
    "site_header": "AdotaPet",
    "site_brand": "AdotaPet",
    "welcome_sign": "Bem-vindo ao AdotaPet",
    "copyright": "AdotaPet",
    
    "search_model": ["animals.Animal",],
    
    # Menu Lateral
    "navigation_expanded": True,
    "show_sidebar": True,
    "icons": {
        "auth": "fas fa-users-cog",
        "auth.user": "fas fa-user",
        "auth.Group": "fas fa-users",
        "ongs.Ong": "fas fa-building-columns",
        "animals.Animal": "fas fa-dog",
    },
    
    "related_modal_active": True,
    
    # Ordenação de Apps/Modelos
    "order_with_respect_to": [
        "auth",
        "ongs",
        "animals",
    ],
    
    # Personalização do layout de login/logout
    "login_logo": None,  # Se você tiver um logo específico, coloque o caminho aqui
    "login_logo_dark": None,
    "show_sidebar": True,
    "navigation_expanded": True,
    
    # Links de menu customizados - estes aparecem no sidebar admin
    "custom_links": {
        "ongs": [{
            "name": "Site Público", 
            "url": "/", 
            "icon": "fas fa-globe",
        }],
    },
    
    # Cores customizadas que combinam com o tema de pets
    "theme": "default",
    "dark_mode_theme": "darkly",
    
    # UI Tweaks
    "button_classes": {
        "primary": "btn-primary",
        "secondary": "btn-secondary",
        "info": "btn-info",
        "warning": "btn-warning",
        "danger": "btn-danger",
        "success": "btn-success"
    },
    
    "site_icon": "fas fa-paw",  # Ícone de pata para o tema de pets
}

# Configurações adicionais para menu de usuário
JAZZMIN_UI_TWEAKS = {
    "navbar_small_text": False,
    "footer_small_text": False,
    "body_small_text": False,
    "brand_small_text": False,
    "brand_colour": "navbar-primary",
    "accent": "accent-primary",
    "navbar": "navbar-white navbar-light",
    "no_navbar_border": True,
    "navbar_fixed": True,
    "layout_boxed": False,
    "footer_fixed": False,
    "sidebar_fixed": True,
    "sidebar": "sidebar-light-primary",
    "sidebar_nav_small_text": False,
    "sidebar_disable_expand": False,
    "sidebar_nav_child_indent": True,
    "sidebar_nav_compact_style": False,
    "sidebar_nav_legacy_style": False,
    "sidebar_nav_flat_style": False,
    "theme": "default",
    "dark_mode_theme": None,
    "button_classes": {
        "primary": "btn-primary",
        "secondary": "btn-secondary",
        "info": "btn-info",
        "warning": "btn-warning",
        "danger": "btn-danger",
        "success": "btn-success"
    }
}