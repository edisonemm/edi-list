from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import ToDoListViewSet, ItemViewSet
from apiAccounts.views import UserViewSet



router = DefaultRouter()
router.register('todolists', ToDoListViewSet, basename="list")
router.register('items', ItemViewSet, basename="item")
router.register('auth', UserViewSet, basename="auth")

urlpatterns = [
    path('', include(router.urls)),
]