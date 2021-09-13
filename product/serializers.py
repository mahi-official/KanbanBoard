from product.models import Category, Product
from rest_framework import serializers


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ['categoryID', 'name']

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = ['productID', 'name', 'desc', 'price', 'status', 'quantity', 'date', 'category']
