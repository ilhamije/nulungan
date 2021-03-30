from django.urls import path
from .views import LapakList, LapakDetail, LikeLapakList

urlpatterns = [
    path('lapaks/', LapakList.as_view(), name='lapak-list'),
    path('lapaks/<uuid:lapak_id>/', LapakDetail.as_view(), name='lapak-detail'),
    path('lapaks/<uuid:lapak_id>/like/', LikeLapakList.as_view(), name='like-lapak'),
]
