from django.db import models
# from django.utils import timezone

# Create your models here.


# needed entries

# title = titel
# pubDate = publication date event
# description = description of event. Locatie, welke hulpdienst
# geolat = latitude
# geolong = longitude

class Incidents(models.Model):
    """Determines entry fields for scraper """

    title = models.CharField(max_length=250, primary_key=True, unique=False)
    description = models.CharField(max_length=250)
    geo_lat = models.CharField(max_length=250, blank=True, null=True)  
    geo_long = models.CharField(max_length=250, blank=True, null=True)
    pubDate = models.CharField(max_length=250)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['title']

    class Admin:
        pass