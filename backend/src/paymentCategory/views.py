from paymentCategory.serializers import PaymentCategorySerializer
from rest_framework import viewsets
from paymentCategory.models import PaymentCategory
# Create your views here.

class PaymentCategoryViewset(viewsets.ModelViewSet):
    queryset = PaymentCategory.objects.all()
    serializer_class = PaymentCategorySerializer
