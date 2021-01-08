from django.urls import include, path
from rest_framework import routers
from . import views
from scraper.views import MapView

router = routers.DefaultRouter()
router.register(r'Incidents', views.IncidentsViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', MapView.as_view()),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('map/', MapView.as_view())
]

