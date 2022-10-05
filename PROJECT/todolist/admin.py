from django.contrib import admin

# Register your models here.
from .models import ToDoList, Item

class ToDoListAdmin(admin.ModelAdmin):
    list_display = ('name', 'countItemsOfList')
    list_filter = ('user',)

    def countItemsOfList(self, obj):
        countItems = obj.items.count()

        return countItems

    countItemsOfList.short_description = "Tasks"
admin.site.register(ToDoList, ToDoListAdmin)


class ItemAdmin(admin.ModelAdmin):
    list_display = ('text', 'todolist')
    list_filter = ('todolist', 'complete')
admin.site.register(Item, ItemAdmin)

