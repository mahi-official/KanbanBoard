from category.serializers import CategorySerializer
from category.models import Category
from rest_framework import viewsets

# Create your views here.
class CategoryViewset(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
