from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser

    # Only show these in the list view
    list_display = ['username', 'game']

    # Show only username, password, and game when editing user
    fieldsets = (
        (None, {'fields': ('username', 'password', 'game')}),
    )

    # Show same fields when adding a new user
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2', 'game')}
        ),
    )

admin.site.register(CustomUser, CustomUserAdmin)
