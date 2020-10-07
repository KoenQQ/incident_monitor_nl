from urllib.request import urlopen
import json
from django.core.management.base import BaseCommand, CommandError

import requests as rq

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

        for i in incident_messages:
            title = i.find('title').text
            description = i.find('description').text
            geo_lat = i.find('geo:lat') # uit find() komt NoneType of het element
            geo_long = i.find('geo:long')
            pubDate = i.find('pubdate').text

            # check if url in db
            try:
                # save in db
                # must match model
                Incidents.objects.create(
                    title=title,
                    description = description if description is not None else " ",
                    geo_lat = geo_lat.text if geo_lat is not None else " ",
                    geo_long = geo_long.text if geo_long is not None else " ",
                    pubDate = pubDate
                    )
                print('%s added' % (title,))
            except:
                print('%s could not add' % (title, ))

        self.stdout.write( 'job complete' )
