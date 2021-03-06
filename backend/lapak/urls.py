from django.urls import path
from . import views

urlpatterns = [
    path('lapaks/', views.lapak_list),
    path('lapaks/<int:pk>/', views.lapak_detail),
]
