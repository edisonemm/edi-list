from django.db import models

# Create your models here.
from django.contrib.auth.models import User
from django.db.models.signals import pre_save, post_save
from django.utils.text import slugify 


class ToDoList(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="todolist")
    name = models.CharField(max_length=150, unique=True)
    slug = models.SlugField(blank=True, editable=False)

    def __str__(self):
        return self.name

def crear_slug(sender, instance, *args, **kwargs):
    slug = slugify(instance.name)
    instance.slug = slug
pre_save.connect(crear_slug, sender=ToDoList)


class Item(models.Model):
    todolist = models.ForeignKey(
        ToDoList, on_delete=models.CASCADE, related_name="items")
    text = models.CharField(max_length=400)
    complete = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    edited_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.text

    class Meta:
        ordering = ["-created_at", "edited_at"]


def create_userList(sender, instance, created, *args, **Kwargs):
    if created:
        ToDoList.objects.create(user=instance,name=f"{instance.username} list")
        print("created")
post_save.connect(create_userList, sender=User)