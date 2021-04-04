from django.urls import path, re_path
from .views import LapakList, LapakDetail, LikeLapakList

urlpatterns = [
    path('lapaks/', LapakList.as_view(), name='lapak-list'),
    path('lapaks/<uuid:lapak_id>/', LapakDetail.as_view(), name='lapak-detail'),
    path('likes/<uuid:lapak_id>/', LikeLapakList.as_view(), name='likes-detail'),
]
