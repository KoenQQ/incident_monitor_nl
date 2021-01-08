from django.contrib import admin



# Register your models here.
from scraper.models import Incidents


@admin.register(Incidents)
class IncidentAdmin(admin.ModelAdmin):
    list_display = ("monitorcode", "comment", "pub_date")
    


