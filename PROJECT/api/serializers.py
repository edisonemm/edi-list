from rest_framework import serializers

from todolist.models import ToDoList, Item 

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'todolist', 'text', 'complete']


class ToDoListSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True, read_only=True)
    class Meta:
        model = ToDoList
        fields = ['id','user','name','slug','items']

