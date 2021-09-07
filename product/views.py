import product
from django.http.response import HttpResponse
from django.views.generic.base import View
from django.views.generic.detail import DetailView
from product.models import Category, Product
from django.shortcuts import get_object_or_404, render
from django.urls.base import reverse_lazy
from django.views.generic import ListView, CreateView, UpdateView
from rest_framework import serializers, viewsets

# Create your views here.
class ProductListView(ListView):
    queryset = Product.objects.order_by('-date')
    context_object_name = 'products'

class ProductDetailView(DetailView):
    model = Product

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['product_list'] = Product.objects.filter(productID=self.kwargs['prodID'])
        return context

class ProductAddView(CreateView):
    model = Product
    fields = ('productID', 'productImgUrl', 'name', 'desc', 'price', 'quantity', 'category')
    success_url = reverse_lazy('product_list')

class ProductUpdateView(UpdateView):
    model = Product
    fields = ('productID', 'productImgUrl', 'name', 'desc', 'price', 'quantity', 'status', 'category')
    success_url = reverse_lazy('product_list')


class ProductByCategoryListView(ListView):
    context_object_name = 'category_products'
    template_name = 'template/product_by_category.html'
    
    def get_queryset(self):
        self.category = get_object_or_404(Category, name=self.kwargs['category'])
        return Product.objects.filter(category=self.category)


def invalidURL(request):
    return HttpResponse("You entered into wrong url. Please go to homepage and try again. If probelm still persits, contact administrator.")

# -------------------------------------------------------------------------------------
# REST APIs
# -------------------------------------------------------------------------------------
class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = ['productID', 'name', 'desc', 'price', 'status', 'quantity', 'date', 'category']

class ProductViewset(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# ------------------------------------------------------------------------------------
class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ['categoryID', 'name']

class CategoryViewset(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
# ------------------------------------------------------------------------------------

