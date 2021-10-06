from product.serializers import ProductSerializer
from product.models import Product
from rest_framework import viewsets


class ProductViewset(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    
    def get_queryset(self):
        catID = self.request.query_params.get('category')
        if catID:
            return Product.objects.filter(category_id=catID)
        return Product.objects.all()
    