from utils import randomID
from payment.models import Payment
from django.db import models
from user.models import User

# Create your models here.
class Order(models.Model):
    orderID =  models.CharField(max_length=32, unique=True, blank=False, null=False)
    userID = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    products = models.CharField(max_length=1000, blank=False, null=False)
    paymentID = models.ForeignKey(Payment, on_delete=models.CASCADE, null=True, blank=True)
    amount = models.PositiveIntegerField(default=0, null=False, blank=False)
    shipping = models.PositiveIntegerField(default=50, null=False, blank=False)
    coupon = models.CharField(max_length=10, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    delivered = models.BooleanField(default=False, blank=False, null=False)

    class Meta:
        ordering = ["-date", "-delivered"]
    
    def __str__(self):
        return self.orderID

    def save(self, *args, **kwargs):
        self.orderID = randomID(length=20)
        super().save(*args, **kwargs)