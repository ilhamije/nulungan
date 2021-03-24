from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView


urlpatterns = [
    path("kiper/", admin.site.urls),
    path('user/', include('authentication.urls')),
    path('', include('lapak.urls')),
]
