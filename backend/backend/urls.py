from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from contrib.views import char_count


urlpatterns = [
    path("kiper/", admin.site.urls),
    path("char_count", char_count, name="char_count"),
    path('', include('lapak.urls')),
]
