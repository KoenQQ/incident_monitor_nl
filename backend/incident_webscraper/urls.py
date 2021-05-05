
from django.contrib import admin
from django.urls import path, include
from scraper import views
from rest_framework_jwt.views import obtain_jwt_token
from scraper.views import home_view

urlpatterns = [
    # path('', include('frontend.urls')), 
    path('', home_view, name='home'),
    path('admin/', admin.site.urls),
    path('scraper/', include('scraper.urls')),
    path('accounts/', include('django.contrib.auth.urls')),
    path('token-auth/', obtain_jwt_token),
] 

