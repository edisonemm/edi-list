from django.shortcuts import render
# Create your views here.

# Django REST Framework
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

# Serializers
from .serializers import UserLoginSerializer, UserSignUpSerializer, UserModelSerializer

# Models
from django.contrib.auth.models import User
from django.contrib.auth import login, logout

class UserViewSet(viewsets.GenericViewSet):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserModelSerializer

    # Detail define si es una petición de detalle o no, en methods añadimos el método permitido, en nuestro caso solo vamos a permitir post
    @action(detail=False, methods=['post'])
    def login(self, request):
        """User sign in."""
        serializer = UserLoginSerializer(data=request.data)
        # if serializer.is_valid():
        serializer.is_valid(raise_exception=True)
        try:
            user, token = serializer.save()
            data = {
                'user': UserModelSerializer(user).data,
                'token': token
            }
        except Exception as e:
            print(e)
        return Response(data, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['POST'])
    def signup(self, request):
        """User sign up."""
        serializer = UserSignUpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        data = UserModelSerializer(user).data
        return Response(data, status=status.HTTP_201_CREATED)

    # @action(detail=False, methods=['GET'])
    # def logout(self, request):
    #     logout(request)
    #     return Response({"logout":"logout"}, status=status.HTTP_202_ACCEPTED)