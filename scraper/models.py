from django.db import models
from django.contrib.gis.db import models as gis_models
from django.contrib.gis.geos import Point

import uuid
# from django.utils import timezone

# Create your models here.

class Incidents(models.Model):
    """database fields"""

    monitorcode = models.CharField(max_length=1000, null=True, blank=True) 
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

