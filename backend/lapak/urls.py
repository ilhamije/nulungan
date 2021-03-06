from django.urls import path
from . import views

urlpatterns = [
    path('lapaks/', views.lapak_list, name='lapak-list'),
    path('lapaks/<str:id>/', views.lapak_detail, name='lapak-detail'),
]
