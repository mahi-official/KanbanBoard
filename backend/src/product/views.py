from product.models import Product
from product.pagination import StandardResultsSetPagination
from product.serializers import ProductSerializer
from rest_framework import viewsets


class ProductViewset(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    pagination_class = StandardResultsSetPagination
    def get_queryset(self):
        catID = self.request.query_params.get('category')
        if catID:
            return Product.objects.filter(category_id=catID)
        return Product.objects.all()
    