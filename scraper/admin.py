from django.contrib import admin
from django.contrib.gis.admin import OSMGeoAdmin

# Register your models here.
from scraper.models import Incidents, ClientLocations


@admin.register(Incidents)
class IncidentAdmin(OSMGeoAdmin):
    list_display = ("monitorcode", "comment", "pub_date")
    
@admin.register(ClientLocations)
class ClientLocationsAdmin(OSMGeoAdmin):
    list_display = ("id", "name", "customer_id", "address", "location", "user")

