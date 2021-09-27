
from django.urls.conf import include, re_path
from django.urls import path
from . import views
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'', views.OrderViewSet)


urlpatterns = [
    path('all/', include(router.urls)),
    re_path('^(?P<uuid>\d+)/all/', views.OrderByUserViewSet),
    path('checkout/', views.placeOrder, name='placeOrder'),
]