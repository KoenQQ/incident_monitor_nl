from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from rest_framework import viewsets, permissions, status
from scraper.serializers import IncidentsSerializer
# from scraper.serializers import UserSerializer, UserSerializerWithToken
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
from django.core import serializers
from django.contrib.auth.models import User
import json



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

def return_degrees(e):
        km = e
        degrees_range =[]
        for kilometers, degrees in distance_key.items():
            if kilometers == km:
                degrees_range = degrees
        return degrees_range


#Filter aan te roepen vanuit frontend
# op basis van locatie, tijd en reiwijdte 
class NearbyIncidents(viewsets.ModelViewSet):
    
    model = Incidents
    serializer_class = IncidentsSerializer

    distance_key = {
        0.5: 0.0045,
        1: 0.009,
        1.5: 0.0135,
        2: 0.018,
        2.5: 0.0225,
        3: 0.027,
        3.5: 0.0315,
        4: 0.036,
        4.5: 0.0405,
        5: 0.045,
        5.5: 0.0495,
        6: 0.054,
        6.5: 0.0585,
        7: 0.063,
        7.5: 0.0675,
        8: 0.072,
        8.5: 0.0765,
        9: 0.081,
        9.5: 0.0855,
        10: 0.09
        }

    
    def list(self, request, **kwargs):
        lat = 52.4
        lng = 4.9
        #filter uit url
        dateRange = self.request.GET.get('dateRange')
        dateRange = int(dateRange)
        point = self.request.GET.get('location-list') 
        searchRange = self.request.GET.get('searchRange')
        searchRange = int(searchRange)
        # searchRange = return_degrees(searchRange)
        print(searchRange)
         # point = Point(lng, lat) #gebruik voor hardcode locatie       
        queryset = Incidents.objects.filter(pub_date__gte=datetime.now()-timedelta(days=dateRange)).filter(location__dwithin=(point, 0.009))
        recent_incidents_list = queryset
        updated_incidents_list = serializers.serialize("json", recent_incidents_list)
        return HttpResponse(updated_incidents_list)


 
class MapView(TemplateView):
    template_name = "map.html"


# @api_view(['GET'])
# def current_user(request):
#     """
#     Determine the current user by their token, and return their data
#     """
    
#     serializer = UserSerializer(request.user)
#     return Response(serializer.data)


# class UserList(APIView):
#     """
#     Create a new user. It's called 'UserList' because normally we'd have a get
#     method here too, for retrieving a list of all User objects.
#     """

#     permission_classes = (permissions.AllowAny,)

#     def post(self, request, format=None):
#         serializer = UserSerializerWithToken(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)