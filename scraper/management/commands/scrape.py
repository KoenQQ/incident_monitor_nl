from urllib.request import urlopen
import json
from django.core.management.base import BaseCommand, CommandError
import numpy as np
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
        
        incidents_data.rename(columns={ 0: "comment", 1: "monitorcode", 2:"latitude", 3:'longtitude', 4:'timestamp'}, inplace=True) 
        incidents_data['emergency_service'] = ""
        incidents_data['priority_code'] = ""
        
        #fill emergency service column
        regex_medical = r'MKA'
        regex_fire = r'BRW'
        regex_police = r'Politie'

        incidents_data['emergency_service'] = np.where(incidents_data['monitorcode'].str.contains(regex_medical), 'Medical', 
            np.where(incidents_data['monitorcode'].str.contains(regex_fire), 'Fire brigade', 
            np.where(incidents_data['monitorcode'].str.contains(regex_police), 'Police', 'unknown')))
        

        #clean up the entries a bit 
        incidents_data['monitorcode'] = incidents_data['monitorcode'].str[:-5]
        incidents_data['monitorcode'] = incidents_data['monitorcode'].str.replace(r'<br\/>', ', ')
        
        incidents_data['latitude'] = incidents_data['latitude'].astype(str)
        incidents_data['latitude'] = incidents_data['latitude'].str.replace(r'<geo:lat>', '').str.replace(r'<\/geo:lat>', '')
        incidents_data['latitude'] = incidents_data['latitude'].astype(float)

        incidents_data['longtitude'] = incidents_data['longtitude'].astype(str)
        incidents_data['longtitude'] = incidents_data['longtitude'].str.replace(r'<geo:long>', '').str.replace(r'<\/geo:long>', '')
        incidents_data['longtitude'] = incidents_data['longtitude'].astype(float)
        
        #fill priority_code column
        incidents_data['priority_code'] = np.where(incidents_data['comment'].str.contains(r'A1'), 'A1', 
            np.where(incidents_data['comment'].str.contains(r'B1'), 'B1', 
            np.where(incidents_data['comment'].str.contains(r'A2'), 'A2', 
            np.where(incidents_data['comment'].str.contains(r'B2'), 'B2', 
            np.where(incidents_data['comment'].str.contains(r'P 1'), 'Prio 1',
            np.where(incidents_data['comment'].str.contains(r'Prio 1'), 'Prio 1',
            np.where(incidents_data['comment'].str.contains(r'P 2'), 'Prio 2',
            np.where(incidents_data['comment'].str.contains(r'Prio 2'), 'Prio 2',
            np.where(incidents_data['comment'].str.contains(r'PRIO 1'), 'Prio 1',
            np.where(incidents_data['comment'].str.contains(r'prio 1'), 'Prio 1',
            np.where(incidents_data['comment'].str.contains(r'PRIO 2'), 'Prio 2',
            np.where(incidents_data['comment'].str.contains(r'prio 2'), 'Prio 2',
            np.where(incidents_data['comment'].str.contains(r'Prio 4'), 'Prio 4',
            np.where(incidents_data['monitorcode'].str.contains(r'Persinformatie'), 'Persinformatie',
            'NaN'))))))))))))))
        
        # #drop unknown values 
        index_names = incidents_data[incidents_data['emergency_service'] == 'unknown']
        print(index_names)
        # incidents_data.drop(incidents_data[incidents_data['emergency_service'] == 'unknown'].index, inplace = True)




        # incidents_data.to_excel('incident_example_data.xlsx') 
        # print('exported')

        #     # check if url in db
        # for s in incidents_data:
        #     try:
        #         # dit moet save to dataframe worden
        #         # save in db
        #         # must match Model
        #         Incidents.objects.create(
        #             title=title,
        #             description = description if description is not None else " ",
        #             message_code = 
        #             emergency_service = 
        #             geo_lat = geo_lat.text if geo_lat is not None else " ",
        #             geo_long = geo_long.text if geo_long is not None else " ",
        #             pubDate = pubDate
        #             )
        #         print('%s added' % (title,))
        #     except:
        #         print('%s could not add' % (title, ))
        
        # self.stdout.write( 'job complete' )
