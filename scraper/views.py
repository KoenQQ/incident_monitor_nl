from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from scraper.serializers import IncidentsSerializer
from .models import Incidents
import django_filters


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

