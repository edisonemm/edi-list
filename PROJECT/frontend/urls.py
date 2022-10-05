from django import views
from django.urls import path
from .views import index

urlpatterns = [
    path("", index),
    path("login", index),
    path("logout", index),
    path("signup", index),
    path("lists", index),
    path("lists/<id>", index),
    path("<path:notfound>", index),
]