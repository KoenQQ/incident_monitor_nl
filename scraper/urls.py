from django.urls import include, path
from rest_framework import routers
from . import views
from scraper.views import MapView 
from scraper.views import current_user

router = routers.DefaultRouter()
router.register(r'incidents', views.IncidentsViewSet, basename='incidents')
router.register(r'location', views.NearbyIncidents, basename='location')
router.register(r'incidentHits', views.IncidentHitsViewSet, basename='IncidentHits')
router.register(r'incidentHitList', views.IncidentHitList, basename='IncidentHitList')
router.register(r'clientLocationList', views.ClientLocationList, basename='ClientLocationList')


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', MapView.as_view()),
    path('api/', include(router.urls)),
    path('current_user/', current_user),

    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # path('users/', UserList.as_view())
]

