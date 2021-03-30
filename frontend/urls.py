from django.urls import path, re_path
from . import views

#by using re_path instead of path we prevent conflicting url paths caused by a conflict 
# between Django and React. 

urlpatterns = [
    # re_path(r'.*', views.index ),
    path('', views.index ),
    path('login', views.index),
    path('dashboard', views.index)
]

