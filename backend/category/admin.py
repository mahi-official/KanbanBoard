from category.models import Category
from django.contrib import admin

# Register your models here.
class CategoryAdmin(admin.ModelAdmin):
    fields = ('name', )
admin.site.register(Category, CategoryAdmin)