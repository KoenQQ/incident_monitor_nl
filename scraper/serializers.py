# serializers.py
from rest_framework import serializers
from .models import Incidents

class IncidentsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Incidents
        fields = ('monitorcode', 'comment', 'priority_code', 'emergency_service', 
                'latitude', 'longitude', 'location', 'region', 'pub_date', 'incident_hash')
