# Generated by Django 3.2.7 on 2021-10-04 16:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payment', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='amount',
            field=models.CharField(default='0', max_length=10),
        ),
    ]
