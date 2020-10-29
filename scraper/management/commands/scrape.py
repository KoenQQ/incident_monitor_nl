from urllib.request import urlopen
import json
from django.core.management.base import BaseCommand, CommandError
import pandas as pd
import requests as rq
import cProfile

from bs4 import BeautifulSoup

from scraper.models import Incidents


class Command(BaseCommand):
    """custom commandline command that scrapes
        title, description from livep2000 and pushes
        it to PostgreSQL db
        """
    help = "collect incidents"

    # define logic of command
    def handle(self, *args, **options):

        #get data
        URL = 'https://feeds.livep2000.nl/'
        xml_data = rq.get(URL).content

        #convert to soup
        soup = BeautifulSoup(xml_data,"html.parser")
        p
        # grab all incidents, met toebehoren
        incident_messages = soup.find_all("item")

        # #df that can take all items
        # incident_columns = ['title', 'description' 'geo_lat', 'geo_long', 'pubDate']
        incidents_data = pd.DataFrame() 


        for i in incident_messages:
            call = []
            title = i.find('title').text
            description = i.find('description').text
            geo_lat = i.find('geo:lat')
            geo_long = i.find('geo:long')
            pubDate = i.find('pubdate').text 
            
            call.append([title, description, geo_lat, geo_long, pubDate])
            incidents_data = incidents_data.append(call)
        
        
        incidents_data['emergency code'] = incidents_data['description'].regex
        print(incidents_data['emergency code'])

        # split the 'description' column up in multiple columns
        for r in incidents_data:
            incidents_data['code'] = incidents_data['description'].apply(lambda x: re.search(r'\d+', x).group())
            incidents_data['e_service'] = incidents_data['description'].apply(lambda x: re.search(r'', x).group())
            #finetune and add

        incidents_data.rename(columns={"0": "title", "1": "description", "2" : "geo_lat", "3" : "geo_long", "4" : "pubDate" })
        # print(incidents_data.head())

            # check if url in db
        for s in incidents_data:
            try:
                # dit moet save to dataframe worden
                # save in db
                # must match Model
                Incidents.objects.create(
                    title=title,
                    description = description if description is not None else " ",
                    message_code = 
                    emergency_service = 
                    geo_lat = geo_lat.text if geo_lat is not None else " ",
                    geo_long = geo_long.text if geo_long is not None else " ",
                    pubDate = pubDate
                    )
                print('%s added' % (title,))
            except:
                print('%s could not add' % (title, ))
        
        self.stdout.write( 'job complete' )
