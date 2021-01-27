from django.contrib import admin
from django.contrib.gis.admin import OSMGeoAdmin

# Register your models here.
from scraper.models import Incidents


@admin.register(Incidents)
class IncidentAdmin(OSMGeoAdmin):
    list_display = ("monitorcode", "comment", "pub_date")
    


