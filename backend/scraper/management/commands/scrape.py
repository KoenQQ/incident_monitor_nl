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
        title, description and more from livep2000 and pushes
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

        # start dataframe
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
        
        incidents_data.rename(columns={ 0: "comment", 1: "monitorcode", 2:"latitude", 3:'longitude', 4:'timestamp'}, inplace=True) 
        incidents_data['emergency_service'] = ""
        incidents_data['priority_code'] = ""
        incidents_data['veiligheidsregio'] = ""
        
        #fill emergency service column
        regex_medical = r'MKA'
        regex_fire = r'BRW'
        regex_police = r'Politie'

        incidents_data['emergency_service'] = np.where(incidents_data['monitorcode'].str.contains(regex_medical), 'ambu', 
            np.where(incidents_data['monitorcode'].str.contains(regex_fire), 'br', 
            np.where(incidents_data['monitorcode'].str.contains(regex_police), 'pol', 'unknown')))
        

        #clean up the entries a bit 
        incidents_data['monitorcode'] = incidents_data['monitorcode'].str[:-5]
        incidents_data['monitorcode'] = incidents_data['monitorcode'].str.replace(r'<br\/>', ', ')
        
        incidents_data['latitude'] = incidents_data['latitude'].astype(str)
        incidents_data['latitude'] = incidents_data['latitude'].str.replace(r'<geo:lat>', '').str.replace(r'<\/geo:lat>', '')
        incidents_data['latitude'] = incidents_data['latitude'].str.replace(r'None', 'NaN')
        incidents_data['latitude'] = incidents_data['latitude'].astype(float)

        incidents_data['longitude'] = incidents_data['longitude'].astype(str)
        incidents_data['longitude'] = incidents_data['longitude'].str.replace(r'<geo:long>', '').str.replace(r'<\/geo:long>', '')
        incidents_data['longitude'] = incidents_data['longitude'].str.replace(r'None', 'NaN')
        incidents_data['longitude'] = incidents_data['longitude'].astype(float)

        
        
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
        
        remove_digits = str.maketrans('', '', digits)

        #clean up locations
        location_list = []
        for e in incidents_data['monitorcode']:
            code = str(e)
            code = code.strip()
            code = code.lower() 
            code = code.translate(remove_digits)
            code = code.replace('mka', '').replace('brw', '').replace('meldkamer', '').replace('(','').replace(')','')
            code = code.replace('monitorcode', '').replace('ambulance', '').replace('persinformatie', '').replace('lichtkrant', '')
            code = code.replace('politie', '').replace('zorg', '').replace('groepscode', '').replace('monitor', '').replace('persvoorlichting', '')
            code = code.replace('bevelvoerders', '').replace('infocode', '').replace('rws', '').replace('persinfo', '').replace(',', '')
            code = code.replace('rapid responder', '').replace('ambu', '').replace(' - ', '').replace('ict functionaris', '')
            code = code.replace('...', '').replace('mk','').replace('first responder', '').replace('ovd', '')
            code = code[0:24]
            code = code.strip()
            seperator = '  '
            code = code.split(seperator, 1)[0]
            code = code.replace('-', ' ')
            location_list.append(code)
        
        incidents_data['veiligheidsregio'] = location_list
        
        #update naar datetime format
        datetime_list = []
        for e in incidents_data['timestamp']:
            datetime_str = e
            date_object = datetime.strptime(datetime_str, "%a, %d %b %Y %H:%M:%S  %z")
            datetime_list.append(date_object)
        incidents_data['timestamp'] = datetime_list

        #add hash to check against db
        hash_list = []
        for r in incidents_data.itertuples():
            monitor = r.monitorcode
            comment = r.comment
            date = str(r.timestamp)
            date = date[:19]
            hash_local = str(monitor + comment + date)
            hash_local = hash_local.replace(' ', '')
            hash_local = bytes(hash_local, encoding='utf-8')
            hash_local = zlib.crc32(hash_local)
            hash_list.append(hash_local)
            
        incidents_data['incident_hash'] = hash_list

        #index reset
        incidents_data = incidents_data.reset_index(drop=True)

        # export naar excel voor scraper uitkomst test
        # incidents_data.to_excel("incident_data.xlsx")

        #check if hash exists, if not push to db
        added_new = 0
        existing = 0

        for row in incidents_data.itertuples():
            hash_row = row.incident_hash
            lat_use = float(row.latitude)
            lon_use = float(row.longitude)
            if Incidents.objects.filter(incident_hash = hash_row).exists():
                # desgewenst aanzetten
                # print('%s exists' % (row.monitorcode))
                existing += 1
                continue
            else:
                Incidents.objects.create(
                    monitorcode = row.monitorcode,
                    comment = row.comment,
                    priority_code = row.priority_code,
                    emergency_service = row.emergency_service,
                    latitude = row.latitude,
                    longitude = row.longitude,
                    location = fromstr('POINT({} {})'.format(lon_use, lat_use), srid=4326),
                    region = row.veiligheidsregio,
                    pub_date = row.timestamp,
                    incident_hash = row.incident_hash
                    ) 
                # desgewenst aanzetten
                # print('%s added' % (row.monitorcode))
                added_new += 1
                continue
            
        self.stdout.write( 'job complete. Added {} new entries, {} entries existed'.format(added_new, existing) )