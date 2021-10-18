from django.urls.conf import include
from django.urls import path
from . import views
from rest_framework import routers


urlpatterns = [
    path('checkout/', views.generate_token, name='clientTokenGeneration'),
    path('process/', views.process_payment, name='clientPaymentProcess'),
]