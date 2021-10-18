from utils import generateID
from category.models import Category
from django.db import models



class Product(models.Model):
    productID = models.CharField(unique=True, blank=False, null=False, max_length=200, editable=False)
    productImgUrl = models.ImageField(upload_to='product_images', max_length=200, blank=True, null=True)
    name = models.CharField(max_length=100, blank=False, null=False)
    desc = models.CharField(max_length=200, blank=True, null=True)
    price = models.PositiveIntegerField(default=0, blank=False, null=False)
    status = models.BooleanField(default=True)
    quantity = models.PositiveIntegerField(default=1)
    date = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.productID = generateID(self.name)
        super().save(*args, **kwargs)

    class Meta:
        ordering = ["-name"]