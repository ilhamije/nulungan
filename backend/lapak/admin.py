from django.contrib import admin
from .models import LapakModel


@admin.register(LapakModel)
class LapakAdmin(admin.ModelAdmin):
    list_display = ('lapak_name',
                    'lapak_type',
                    'city',
                    'address')

    fieldsets = (
        (None, {
            'fields': (
                'lapak_name',
                'lapak_type',
                'city',
                'address',
                'latitude',
                'longitude',
                'image_url',
                'socmed_link',
            )
        }),
        ('Existence status', {
            'fields': (
                'active',
                'valid',
            )
        }),
    )
