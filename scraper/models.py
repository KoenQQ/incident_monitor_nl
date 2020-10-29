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

    #hulpdienst opties
    e_service_choices = (
        ('br', 'brandweer'),
        ('pol', 'politie'),
        ('ambu', 'ambulance')
    )


    title = models.CharField(max_length=250, primary_key=True, unique=False)
    description = models.CharField(max_length=250) #full description 
    message_code = models.CharField(max_length=100) #hier ook optie lijst maken? 
    emercency_service = models.CharField(max_length=100, choices = e_service_choices)
    geo_lat = models.CharField(max_length=250, blank=True, null=True)  
    geo_long = models.CharField(max_length=250, blank=True, null=True)
    pubDate = models.CharField(max_length=250) 

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['title']

    class Admin:
        pass