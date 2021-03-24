from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import (ObtainTokenView,
                    CustomUserCreate)

urlpatterns = [
    path('token/obtain/', ObtainTokenView.as_view(), name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
