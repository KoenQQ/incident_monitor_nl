# Generated by Django 3.0.5 on 2020-09-30 09:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scraper', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='incidents',
            name='url',
        ),
        migrations.AlterField(
            model_name='incidents',
            name='title',
            field=models.CharField(max_length=250, primary_key=True, serialize=False, unique=True),
        ),
    ]
