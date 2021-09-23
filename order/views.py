import json
from order.serializers import OrderSerializer
from order.models import Order
from django.contrib.auth import get_user_model
from django.http.response import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from rest_framework import viewsets


# Create your views here.
@csrf_exempt
@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def placeOrder(request):
    
    try:
        userModel = get_user_model()

        uuid = request.user.id
        pyid = request.data.get("paymentID")
        amnt = request.data.get("amount")
        pdts = json.dumps(request.data.get("products"))
        ship = request.data.get("shipping")
        cupn = request.data.get("coupon")

        order = Order(userID=uuid, products=pdts, paymentID=pyid, amount=amnt, shipping=ship, coupon=cupn)
        order.save()
        return JsonResponse({
            'status_code': HTTP_200_OK,
            'order': order.orderID
        })
    
    except userModel.DoesNotExist:
        return JsonResponse({
            'status_code': HTTP_400_BAD_REQUEST,
            'error': 'User Model not found. Please contact admin.'
        })


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all().order_by('id')


    