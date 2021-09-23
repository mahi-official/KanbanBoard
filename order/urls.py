
from django.urls.conf import include
from django.urls import path
from . import views
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'', views.OrderViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('checkout/', views.placeOrder, name='placeOrder'),
]