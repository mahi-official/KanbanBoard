from utils import randomID
from paymentCategory.models import PaymentCategory
from django.db import models

# Create your models here.
class Payment(models.Model):
    paymentID = models.CharField(max_length=32, blank=False, null=False)
    transactionID = models.CharField(max_length=150, blank=True, null=True)
    amount = models.PositiveIntegerField(default=0, null=False, blank=False)
    date = models.DateTimeField(auto_now_add=True)
    mode = models.ForeignKey(PaymentCategory, on_delete=models.CASCADE, default=1)

    class Meta:
        ordering = ["-date"]
    
    def __str__(self):
        return self.paymentID

    def save(self, *args, **kwargs):
        self.paymentID = randomID(length=32)
        super().save(*args, **kwargs)