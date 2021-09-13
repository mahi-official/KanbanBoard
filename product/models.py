from django.db import models
from django.utils import timezone

def generateID(name:str):
    return name+'_'+''.join(filter(str.isdigit, str(timezone.now())))[:-4]

class Category(models.Model):
    categoryID = models.SlugField(unique=True, max_length=50, editable=False)
    name = models.CharField(max_length=50, null=False, blank=False)

    class Meta:
        ordering = ["-name"]
    
    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.categoryID = generateID(self.name)
        super().save(*args, **kwargs)


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