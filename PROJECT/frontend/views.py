from django.shortcuts import render

# Create your views here.


def index(request, *args, **Kwargs):
    return render(request, "frontend/index.html")