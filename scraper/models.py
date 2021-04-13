from django.db import models
from django.contrib.gis.db import models as gis_models
from django.contrib.gis.geos import Point

import uuid

# Create your models here.

class Incidents(models.Model):
    """Incidentslists"""

    monitorcode = models.CharField(max_length=2500, null=True, blank=True) 
    comment = models.CharField(max_length=300, null=True, blank=True)
    priority_code = models.CharField(max_length=100, null=True, blank=True) 
    emergency_service = models.CharField(max_length=100, blank=True, null=True)
    latitude = models.CharField(max_length=253, blank=True, null=True)  
    longitude = models.CharField(max_length=252, blank=True, null=True)
    location = gis_models.PointField(default=Point(0, 0), blank=True)
    region = models.CharField(max_length=248, blank=True, null=True)
    pub_date = models.DateTimeField(max_length=249, blank=True, null=True)
    incident_hash = models.CharField(max_length=20, primary_key=True, blank=True)

    def __str__(self):
        return self.comment

    class Meta:
        ordering = ['comment']

    class Admin:
        pass


class ClientLocations(models.Model):
    """Tracked locations added by users"""
    
    name = models.CharField(max_length=250, null=True, blank=True)
    customer_id = models.CharField(max_length=250, null=True, blank=True)
    description = models.CharField(max_length=500, null=True, blank=True)
    address = models.CharField(max_length=40, null=True, blank=True)
    client_location = gis_models.PointField(default=Point(0,0), blank=True)
    user = models.CharField(max_length=40, blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
    
    class Admin:
        pass


class IncidentHits(models.Model):
    """Incidents nearby customers"""

    monitorcode = models.CharField(max_length=2500, null=True, blank=True) 
    comment = models.CharField(max_length=300, null=True, blank=True)
    priority_code = models.CharField(max_length=100, null=True, blank=True) 
    emergency_service = models.CharField(max_length=100, blank=True, null=True)
    location = gis_models.PointField(default=Point(0, 0), blank=True)
    region = models.CharField(max_length=248, blank=True, null=True)
    pub_date = models.DateTimeField(max_length=249, blank=True, null=True)
    incident_hash = models.CharField(max_length=20, primary_key=True, blank=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    customer_id = models.CharField(max_length=100, null=True, blank=True)
    description = models.CharField(max_length=300, null=True, blank=True)
    address = models.CharField(max_length=50, null=True, blank=True)
    client_location = gis_models.PointField(default=Point(0,0), blank=True)
    user = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        ordering = ['pub_date']
        managed = False
        db_table = 'incident_hits'
    
    class Admin:
        pass