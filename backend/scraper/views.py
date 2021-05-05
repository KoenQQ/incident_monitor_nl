from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from rest_framework import viewsets, permissions, status
from scraper.serializers import IncidentsSerializer, IncidentHitsSerializer, UserSerializer, UserSerializerWithToken, ClientLocationSerializer
from .models import Incidents, IncidentHits, ClientLocations
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
from django.shortcuts import render
from django.http import HttpResponse


# basic homepage view
def home_view(request,*args, **kwargs):
    return HttpResponse("<h1>API acces here</h1>")



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

class IncidentHitsViewSet(viewsets.ModelViewSet):
    queryset = IncidentHits.objects.all().order_by('pub_date')
    serializer_class = IncidentHitsSerializer


def return_degrees(e):
        km = e
        degrees_range =[]
        for kilometers, degrees in distance_key.items():
            if kilometers == km:
                degrees_range = degrees
        return degrees_range

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
        10: 0.09,
        10.5: 0.0945,
        11: 0.099,
        11.5: 0.1035,
        12: 0.108,
        12.5: 0.1125,
        13: 0.117,
        13.5: 0.1215,
        14: 0.126,
        14.5: 0.1305,
        15: 0.135,
        15.5: 0.1395,
        16: 0.144,
        16.5: 0.1485,
        17: 0.153,
        17.5: 0.1575,
        18: 0.162,
        18.5: 0.1665,
        19: 0.171,
        19.5: 0.1755,
        20: 0.18
        }


class NearbyIncidents(viewsets.ModelViewSet):
    """ Returns incidents nearby set point. """   
    
    model = Incidents
    serializer_class = IncidentsSerializer

    def list(self, request, **kwargs):
        lat = 52.4
        lng = 4.9
        # point = Point(lng, lat) #gebruik voor hardcode locatie   

        ### URL FILTERS ###

        #date
        dateRange = self.request.GET.get('dateRange')
        dateRange = int(dateRange)

        #location 
        point = self.request.GET.get('location-list')

        #searchrange
        searchRange = self.request.GET.get('searchRange')
        searchRange = float(searchRange)
        searchRange = return_degrees(searchRange)

        #filter for specific words
        comment = self.request.GET.get('wordSearch')
        
        #(de)select specific emergency services
        includePolice = self.request.GET.get('includePolice') # add or exclude emergency service pol
        finalFilter = []
        policeFilter = []
        if includePolice == 'true':
            policeFilter = 'pol'
            finalFilter.append('pol')
        else:
            policeFilter = ''
        includeFire = self.request.GET.get('includeFire') # add or exclude emergency service br
        fireFilter = []
        if includeFire == 'true':
            fireFilter = 'br'
            finalFilter.append('br')
        else: 
            fireFilter = ''
        includeAmbu = self.request.GET.get('includeAmbu') # add or exclude emergency service ambu
        ambuFilter = []
        if includeAmbu == 'true':
            ambuFilter = 'ambu'
            finalFilter.append('ambu')
        else: 
            ambuFilter = ''

        #queryset
        queryset = Incidents.objects.filter(pub_date__gte=datetime.now()-timedelta(days=dateRange)).filter(location__dwithin=(point, searchRange)).filter(comment__contains=comment).filter(emergency_service__in=finalFilter)
        recent_incidents_list = queryset
        updated_incidents_list = serializers.serialize("json", recent_incidents_list)

        return HttpResponse(updated_incidents_list)


class IncidentHitList(viewsets.ModelViewSet):
    """returns all hits pertaining incidents nearby client locations 
    filtered based on user & number of days. """

    model = IncidentHits
    serializer_class = IncidentHitsSerializer

    def list(self, request, **kwargs):
        user = request.user
        # days = self.request.GET.get('days')
        #returns *all* hits. future: add param that defines nr of days. 
        queryset = IncidentHits.objects.filter(user__exact=user)[:100]
        # .filter(pub_date__gte=datetime.now()-timedelta(days=days))
        hit_list = serializers.serialize("json", queryset)

        return HttpResponse(hit_list)


class ClientLocationList(viewsets.ModelViewSet):
    """ Returns all locations that a user is 
    tracking in the app. """

    model = ClientLocations
    serializer_class = ClientLocationSerializer

    def list(self, request, **kwargs):
        user = request.user
        queryset = ClientLocations.objects.filter(user__exact=user)
        client_list = serializers.serialize("json", queryset)

        return HttpResponse(client_list)


class MapView(TemplateView):
    template_name = "map.html"


@api_view(['GET'])
def current_user(request):
    """ Determine the current user by their token, 
    and return their data. """
    
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


# ACTIVATE WHEN IMPLEMENTING SIGNUP
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



class ClientLocations(APIView):
    """
    Add and remove client locations 
    """

    def post(self, request, format=None):
        serializer = ClientLocationsWithToken(data=request.data)
        
        if serializer.is_valid():
            user
            #transform postcode into point 
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


