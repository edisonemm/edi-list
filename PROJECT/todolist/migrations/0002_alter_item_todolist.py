# Generated by Django 4.0.4 on 2022-04-12 17:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('todolist', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='todolist',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='todolist.todolist'),
        ),
    ]
