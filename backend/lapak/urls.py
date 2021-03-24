from django.urls import path
from .views import PublicLapakList, LapakList, LapakDetail

urlpatterns = [
    path('', PublicLapakList.as_view(), name='public-lapak-list'),
    path('lapaks/', LapakList.as_view(), name='lapak-list'),
    path('lapaks/<str:lapak_id>/', LapakDetail.as_view(), name='lapak-detail'),
]
