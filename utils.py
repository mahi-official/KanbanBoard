from django.utils import timezone
from django.http.response import HttpResponse

def generateID(name:str):
    return name+'_'+''.join(filter(str.isdigit, str(timezone.now())))[:-4]

def invalidURL(request):
    return HttpResponse("You entered into wrong url. Please go to homepage and try again. If probelm still persits, contact administrator.")
