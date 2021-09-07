from product.models import Product
from django.contrib import admin
from .models import Category, Product

# Register your models here.

admin.site.register(Product)

class CategoryAdmin(admin.ModelAdmin):
    fields = ('name', )
admin.site.register(Category, CategoryAdmin)