from django.urls.conf import include
from django.urls import path
from . import views
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'products', views.ProductViewset)
router.register(r'categories', views.CategoryViewset)


urlpatterns = [
    path('api/', include(router.urls)),
    # path('products/', views.ProductListView.as_view(), name='product_list'),
    # path('product/<prodID>/', views.ProductDetailView.as_view(), name='product_detail'),
    # path('product/<category>/', views.ProductByCategoryListView.as_view(), name='category_products'),
    # path('product/add/', views.ProductAddView.as_view(), name='product_add'),
    # path('product/update/<prodID>/', views.ProductUpdateView.as_view(), name='product_update'),
    path('product/', views.invalidURL, name='invaid_page'),
]