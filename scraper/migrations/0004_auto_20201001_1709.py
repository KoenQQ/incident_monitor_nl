# Generated by Django 3.0.5 on 2020-10-01 15:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scraper', '0003_auto_20200930_1456'),
    ]

    operations = [
        migrations.AlterField(
            model_name='incidents',
            name='pubDate',
            field=models.CharField(max_length=250),
        ),
    ]
