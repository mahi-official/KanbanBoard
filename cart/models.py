from django.db import models
from django.utils import timezone
import random
import string

def generateID():
    return ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(10))

# Create your models here.
