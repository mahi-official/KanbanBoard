from paymentCategory.models import PaymentCategory
from django.contrib import admin

# Register your models here.
class PaymentCategoryAdmin(admin.ModelAdmin):
    fields = ('name', )
admin.site.register(PaymentCategory, PaymentCategoryAdmin)