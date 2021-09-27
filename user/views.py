import json
from user.models import User
from user.serializers import UserSerializer
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.contrib.auth import login, logout
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
import re
from django.db.models import Q
from rest_framework.authtoken.models import Token
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from django.forms.models import model_to_dict

@csrf_exempt
@api_view(["POST"])
@permission_classes([AllowAny])
def registerUser(request):
    try:
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            account = serializer.save()
            account.is_active = True
            account.save()
            token = Token.objects.get_or_create(user=account)[0].key
            
            user = model_to_dict(account)
            user.pop('password', None)

            return JsonResponse({
                'status': HTTP_200_OK,
                'token': token,
                'user': user
            })
        else:
            return JsonResponse({
                'status': HTTP_400_BAD_REQUEST,
                'error': serializer.errors
            })
    except Exception as e:
        print(e)
        return JsonResponse({
                'status': HTTP_400_BAD_REQUEST,
                'error': 'Invalid data. Please try again'
            })


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def signInUser(request):

    email = request.data.get("email")
    password = request.data.get("password")

    if email is None or password is None:
       return JsonResponse({
            'status': HTTP_400_BAD_REQUEST,
            'error': 'Both email and password is required.'
        })
    
    if not re.match(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)", email):
        return JsonResponse({
            'status': HTTP_400_BAD_REQUEST,
            'error': 'Email address is not valid.'
        })

    if len(password) < 5:
        return JsonResponse({
            'status': '400',
            'error': 'Password is too short.'
        })
    
    userModel = get_user_model()

    try:
        user = userModel.objects.filter(Q(userID__iexact=email) | Q(email__iexact=email)).distinct().first()
        if user:
            if user.check_password(password):
                login(request, user)
                token, _ = Token.objects.get_or_create(user=user)
                user = model_to_dict(user)
                user.pop('password', None)
                return JsonResponse({
                    'token': token.key,
                    'status': HTTP_200_OK,
                    'user': user
                })
            
            return JsonResponse({
                    'status': HTTP_400_BAD_REQUEST,
                    'error': 'Invalid Credentials.'
                })
        
        return JsonResponse({
            'status': HTTP_400_BAD_REQUEST,
            'error': 'Account not found. Please Sign Up.'
        })

    except userModel.DoesNotExist:
        return JsonResponse({
            'status': HTTP_400_BAD_REQUEST,
            'error': 'User Model not found. Please contact admin.'
        })


@csrf_exempt
@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def signOutUser(request):
    
    request.user.auth_token.delete()
    logout(request)
    
    return JsonResponse({
        'status': HTTP_200_OK,
        'message': 'Logged out successfully.'
    })
    


# class UserViewSet(viewsets.ModelViewSet):
#     serializer_class = UserSerializer
#     queryset = User.objects.all().order_by('id')
