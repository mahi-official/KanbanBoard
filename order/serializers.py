
from order.models import Order
from rest_framework import serializers


class OrderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'orderID', 'userID', 'paymentID', 'amount', 'date', 'delivered']
    