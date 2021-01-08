from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from scraper.serializers import IncidentsSerializer
from .models import Incidents
import django_filters
from django.views.generic import TemplateView


class IncidentsViewSet(viewsets.ModelViewSet):
    queryset = Incidents.objects.all().order_by('monitorcode')
    serializer_class = IncidentsSerializer


# next step: beter frontend
def index(request):
    return HttpResponse('Welcome to the jungle. Work in progres, MVP launch Feb 2021.')

#django_filter
def search(request):
    incidents_list = Incidents.objects.all()
    incidents_filter = Incidents_filter(request.GET, queryset=user_list)
    return render(request, 'search/incidents_list.html', {'filter': user_filter})

class MapView(TemplateView):
    template_name = "map.html"

# weet nog niet zeker of dit nodig is en of dit de goede locatie is. 
# class Location(generic.ListView):
#     model = Incidents
    
#     def get_nearest_locations(user_location, self, **kwargs):
#         #find locations within radius of user_location
#         context_object_name = 'incidents'
#         queryset = Incidents.objects.annotate(distance=Distance('location',
#         user_location)).order_by('distance')[0:6]
#         template_name = 'test.tml'

# class NearbyIncidents(generic.ListView):
#     model = Incidents
#     context_object_name = 'shops'
#     queryset = Incidents.objects.annotate(distance=Distance('location',
#     user_location)
#     ).order_by('distance')[0:6]
#     template_name = 'distance.html'
