from utils import generateID
from django.db import models
from django.utils import timezone

# Create your models here.

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
