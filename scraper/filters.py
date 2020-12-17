# django-filters filter system
# hooked to the database
# maybe fold into views.py & DRN


from .models import Incidents
import django_filters

class IncidentsFilter(django_filters.FilterSet):
    class Meta:
        model = Incidents
        fields = ['monitorcode', 'comment', 'priority_code', 'emergency_service', 
                'latitude', 'longitude', 'region', 'pubDate' ]

