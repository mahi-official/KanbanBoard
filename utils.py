from django.utils import timezone
import random
from django.http.response import HttpResponse

def generateID(name:str):
    return name+'_'+''.join(filter(str.isdigit, str(timezone.now())))[:-4]

def invalidURL(request):
    return HttpResponse("You entered into wrong url. Please go to homepage and try again. If probelm still persits, contact administrator.")

def randomID(length=10):
    vals = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz9876543210'
    return ''.join(random.choice([val for val in vals]) for _ in range(length))