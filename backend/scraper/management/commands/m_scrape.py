from urllib.request import urlopen
import json
from django.core.management.base import BaseCommand, CommandError
import numpy as np
import pandas as pd
import requests as rq
import cProfile
from string import digits
import re
from datetime import datetime
from bs4 import BeautifulSoup
from django.contrib.gis.geos import Point
from django.contrib.gis.geos import fromstr
from scraper.models import Incidents
import zlib


class Command(BaseCommand):
    """custom commandline command that scrapes
        title, description and more from MOBILE livep2000 website and pushes
        it to PostgreSQL db
        """
    help = "collect incidents"

    # define logic of command
    def handle(self, *args, **options):

        #get data
        URL = 'https://m.livep2000.nl/'
        # URL = 'https://feeds.livep2000.nl/'

        xml_data = rq.get(URL).content

        #convert to soup
        soup = BeautifulSoup(xml_data,"html.parser")
        
        # grab all incidents, met toebehoren
        incident_messages = soup.find_all("item")

        # start dataframe
        incidents_data = pd.DataFrame() 


