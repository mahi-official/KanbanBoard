from paymentCategory.models import PaymentCategory
from rest_framework import serializers


class PaymentCategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PaymentCategory
        fields = ['id', 'categoryID', 'name']