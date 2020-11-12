from django.db import models
import uuid
# from django.utils import timezone

# Create your models here.

class Incidents(models.Model):
    """Determines entry fields for scraper """

    monitorcode = models.CharField(max_length=250, primary_key=True) 
    comment = models.CharField(max_length=250)
    priority_code = models.CharField(max_length=100, null=True, blank=True) 
    emercency_service = models.CharField(max_length=100, blank=True, null=True)
    latitude = models.CharField(max_length=250, blank=True, null=True)  
    longitude = models.CharField(max_length=250, blank=True, null=True)
    region = models.CharField(max_length=250, blank=True, null=True)
    pubDate = models.CharField(max_length=250, blank=True, null=True)
    unique_code = models.UUIDField(default=uuid.uuid4, unique=True) 

    def __str__(self):
        return self.comment

    class Meta:
        ordering = ['comment']

    class Admin:
        pass