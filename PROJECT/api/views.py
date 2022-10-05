from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from todolist.models import ToDoList, Item
from .serializers import ToDoListSerializer, ItemSerializer

"""
@api_view(["GET"])
def api(request, *args, **Kwargs):
    instance = ToDoList.objects.all()[0]
    data = {}
    if instance:
        data = ToDoListSerializer(instance).data

    return Response(data)



class Todolist(APIView):
    serializer_class = ToDoListSerializer
    
    def get(self, request, format=None):
        return Response({"a":"b"})

    def post(self, request):
        serializer =  self.serializer_class(data=request.data)

        if serializer.is_valid():
            return Response({"reponse": "sucessfuly"})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk=None):
        return Response({"method":"put"})

    def patch(self, request, pk=None):
        return Response({"method":"patch"})

    def delete(self, request, pk=None):
        return Response({"method":"delete"})
"""
"""
# class ToDoListViewSet(viewsets.ViewSet):
#     serializer_class = ToDoListSerializer

#     def list(self, request):
#         if request.user.is_authenticated:
#             queryset = ToDoList.objects.filter(user=request.user)
#             serializer = self.serializer_class(queryset, many=True)
#             return Response(serializer.data)
#         return Response({"error":"debes iniciar sesion"})

#     def create(self, request):
#         serializer =  self.serializer_class(data=request.data)

#         if serializer.is_valid():
#             name = serializer.validated_data.get("name")
#             return Response({"reponse": f"sucessfuly. created: {name}"})
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def retrieve(self, request, pk=None):
#         #objeto y su id
#         return Response({"method":"GET"})

#     def update(self, request, pk=None):
#         return Response({"method":"PUT"})

#     def partial_update(self, request, pk=None):
#         return Response({"method":"PATCH"})

#     def destroy(self, request, pk=None):
#         return Response({"method":"DELETE"})

# class ItemViewSet(viewsets.ViewSet):
#     serializer_class = ItemSerializer
#     queryset
#     def list(self, request):
#         if request.user.is_authenticated:
#             queryset = ToDoList.objects.filter(user=request.user)
#             serializer = self.serializer_class(queryset, many=True)
#             return Response(serializer.data)
#         return Response({"error":"debes iniciar sesion"})

#     def create(self, request):
#         serializer =  self.serializer_class(data=request.data)

#         if serializer.is_valid():
#             name = serializer.validated_data.get("name")
#             return Response({"reponse": f"sucessfuly. created: {name}"})
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def retrieve(self, request, pk=None):
#         #objeto y su id
#         return Response({"method":"GET"})

#     def update(self, request, pk=None):
#         return Response({"method":"PUT"})

#     def partial_update(self, request, pk=None):
#         return Response({"method":"PATCH"})

#     def destroy(self, request, pk=None):
#         return Response({"method":"DELETE"})
"""

class ToDoListViewSet(viewsets.ModelViewSet):
    queryset = ToDoList.objects.all()
    serializer_class = ToDoListSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)

    def list(self, request):
        if request.user.is_authenticated:
            queryset = self.queryset.filter(user=request.user)
            if request.GET.get("slug"):
                try:
                    queryset = queryset.filter(slug=request.GET.get("slug"))
                    if not queryset.exists():
                        return Response({"error": "NOt exists"})
                except:
                    return Response({"error": "Algun error1"})
            serializer = self.serializer_class(queryset, many=True)
            return Response(serializer.data)
        return Response({"error": "debes iniciar sesion"})


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)

    def itemsOfQueryset(self, request):
        return self.queryset.filter(todolist__id=request.GET["listid"])

    def list(self, request):
        if request.user.is_authenticated:
            queryset = self.queryset
            if request.GET.get("listid"):
                try:
                    queryset = self.itemsOfQueryset(request)
                except:
                    return Response({"error": "Algun error"})
            serializer = self.serializer_class(queryset, many=True)
            return Response(serializer.data)
        return Response({"error": "debes iniciar sesion"})

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            if request.GET.get("listid"):
                try:
                    queryset = self.itemsOfQueryset(request)
                except:
                    return Response({"error": "Algun error"})
            serializer = self.serializer_class(queryset, many=True)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
