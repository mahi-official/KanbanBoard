import os, json
from pathlib import Path
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

def get_credentials():
    try:
        env_file_dir = Path(__file__).resolve().parent
        with open(os.path.join(env_file_dir, '.env'), 'r') as f:
            creds = json.loads(f.read())
        return creds
    except:
        return None
