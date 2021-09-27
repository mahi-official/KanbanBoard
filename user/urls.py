from django.urls.conf import include
from django.urls import path
from . import views
from rest_framework import routers


urlpatterns = [
    path('signup/', views.registerUser, name='signup'),
    path('login/', views.signInUser, name='signin'),
    path('logout/', views.signOutUser, name='signout'),
]