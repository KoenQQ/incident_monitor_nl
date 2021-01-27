from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from scraper.serializers import IncidentsSerializer
from .models import Incidents
import django_filters
from django.views.generic import TemplateView
from django.views import generic
from datetime import datetime, timedelta
from django.contrib.gis.geos import GEOSGeometry
from django.http import JsonResponse
from django.contrib.gis.measure import Distance  
from django.contrib.gis.geos import Point
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from django.forms.models import model_to_dict
import json
from django.core import serializers

def mapItem(item):
	return {
			'monitorcode': item['monitorcode'],
            'comment': item['comment'],
            'priority_code': item['priority_code'],
            'emergency_service': item['emergency_service'],
            'location': item['location'],
            'region': item['region'],
            'pub_date': item['pub_date']
	}

#API 
class IncidentsViewSet(viewsets.ModelViewSet):
    queryset = Incidents.objects.all().order_by('monitorcode')
    serializer_class = IncidentsSerializer

#return nearby recent incidents
class NearbyIncidents(viewsets.ModelViewSet):
    
    model = Incidents
    serializer_class = IncidentsSerializer

    def list(self, request, **kwargs):
        lat = 52.4
        lng = 4.9
        point = self.request.GET.get('location-list') #filter uit url
        # point = Point(lng, lat) #gebruik voor hardcode locatie
        queryset = Incidents.objects.filter(pub_date__gte=datetime.now()-timedelta(days=30)).filter(location__dwithin=(point, 0.009))
        recent_incidents_list = queryset
        updated_incidents_list = serializers.serialize("json", recent_incidents_list)
        return HttpResponse(updated_incidents_list)

 
class MapView(TemplateView):
    template_name = "map.html"


