
from order.models import Order
from rest_framework import serializers


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'orderID', 'userID', 'paymentID', 'products', 'amount', 'date', 'delivered']
    