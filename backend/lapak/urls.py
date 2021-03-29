from django.urls import path
from .views import LapakList, LapakDetail

urlpatterns = [
    path('lapaks/', LapakList.as_view(), name='lapak-list'),
    path('lapaks/<str:lapak_id>/', LapakDetail.as_view(), name='lapak-detail'),
]
