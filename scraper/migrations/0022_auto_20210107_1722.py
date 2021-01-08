# Generated by Django 3.1.4 on 2021-01-07 16:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scraper', '0021_incidents_location'),
    ]

    operations = [
        migrations.AddField(
            model_name='incidents',
            name='incident_hash',
            field=models.CharField(default=1, max_length=20, primary_key=True, serialize=False),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='incidents',
            name='comment',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='incidents',
            name='monitorcode',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]