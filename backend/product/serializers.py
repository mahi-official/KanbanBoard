from product.models import Product
from rest_framework import serializers


class ProductSerializer(serializers.ModelSerializer):
    #category = CategorySerializer(read_only=True)
    productImgUrl = serializers.ImageField(max_length=None, allow_empty_file=False, allow_null=True, required=False)
    class Meta:
        model = Product
        fields = ['id', 'productID', 'productImgUrl', 'name', 'desc', 'price', 'status', 'quantity', 'date', 'category']
    