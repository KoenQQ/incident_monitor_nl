# Generated by Django 3.0.5 on 2020-11-19 13:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('scraper', '0018_auto_20201112_1556'),
    ]

    operations = [
        migrations.RenameField(
            model_name='incidents',
            old_name='emercency_service',
            new_name='emergency_service',
        ),
    ]