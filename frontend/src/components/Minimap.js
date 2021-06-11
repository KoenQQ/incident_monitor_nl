import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import React from 'react';
import { getClientLocations, getIncidentHits } from '../services/api';
import './Application.js'


mapboxgl.accessToken = process.env.REACT_APP_MAPBOXGL_ACCESS_TOKEN;


class Minimap extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        lng: 5.8,
        lat: 52,
        zoom: 7,
        user: '',
        clients: [],
        incidents: []
      };
    }

    async componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/kdebrauw/ckaxjbuh50ohl1ioo470azefc',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        })

        //call incidents & client list api's
        const results = await getClientLocations();
        const results_i = await getIncidentHits();
        
        // client locations
        this.results = results.data;
        const clients = results.data;
        const client_fields = []
        const client_length = clients.length
        for (var i = 0; i < client_length; i++) {
          client_fields.push(clients[i].fields);
        }
        this.setState({ clients: client_fields });
        
        // incidents
        this.results_i = results_i.data;
        const hitzone = results_i.data;
        const es = ['ambu']
        const filtered_hitzone = hitzone.filter(function(item){
            return es.indexOf(item.emergency_service)}) 
        filtered_hitzone.sort((d1, d2) => new Date(d2.pub_date).getTime() - new Date(d1.pub_date).getTime());
        this.setState({ hits: filtered_hitzone});
        
        
        //add both arrays to mapsource
        await map.addSource('incidenten', {
            type: 'geojson',
            data: jsonToGeoJson(this.state.hits)
          });
        
       await map.addSource('clients', {
            type: 'geojson',
            data: clientJsonToGeoJson(client_fields)
        });
        

        //add both sources as map layers 
        await map.addLayer({
            id: 'locaties_waddan',
            type: 'circle',
            source: 'incidenten',
            paint: {
              'circle-radius': 5,
              'circle-stroke-color': '#2A3C47',
              'circle-stroke-width': 1,
              'circle-color': [
                'match',
                ['get', 'emergency_service'],
                'ambu',
                '#EFDC23',
                'br',
                '#D13620',
                'pol',
                '#2134BE',
                'unknown',
                '#3bb2d0',
                /* other */ '#3C3C3D'
              ]
            }
          });
        
        await map.addLayer({
            id: 'klant_locaties',
            type: 'circle',
            source: 'clients',
            paint: {
              'circle-radius': 8,
              'circle-stroke-color': '#2A3C47',
              'circle-stroke-width': 1,
              'circle-color': '#2EAD5D'
            }})


        map.on('mouseenter', 'locaties_waddan', function (e) {
          map.getCanvas().style.cursor = 'pointer';

          var coordinates = e.features[0].geometry.coordinates.slice();
          var comment = e.features[0].properties.comment
          var pub_date = e.features[0].properties.pub_date

          console.log(comment)
          popup_extra
            .setLngLat(coordinates)
            .setHTML(
              '<H4> Incident </H4>' +
              comment +
              '<br><br> Datum: ' +
              pub_date
            ).addTo(map)
        })

        map.on('mouseleave', 'locaties_waddan', function () {
          map.getCanvas().style.cursor = '';
          popup_extra.remove();
        });

        map.on('mouseenter', 'klant_locaties', function (e) {
          map.getCanvas().style.cursor = 'pointer';
          
          var coordinates = e.features[0].geometry.coordinates.slice();
          var name = e.features[0].properties.name
          var locatie = e.features[0].properties.address

          popup_extra
            .setLngLat(coordinates)
            .setHTML(
              '<H3> Klant </H3>' + name
              + '<br><br> Adres: ' + locatie
            ).addTo(map)
        })

        map.on('mouseleave', 'klant_locaties', function () {
          map.getCanvas().style.cursor = '';
          popup_extra.remove();
        });

        var popup_extra = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
        });


        //function: transform incidents to geojson
        function jsonToGeoJson(e) {
            var geojson = {
              type: 'FeatureCollection',
              features: []
            };
            var length = Object.keys(e).length;

            for (var i = 0; i < length; i++) {
                var location = e[i].location
                var regex = /\d{1,}.\d{4,}\s\d{1,}.\d{4,}/;
                var location_filtered = location.match(regex)
                var located = location_filtered[0]
                var locatid = located.split(' ')
                var locilized = []
                locilized.push(locatid[0])
                locilized.push(locatid[1])
                // var locateded = '[' + located + ']'

              geojson.features.push({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: locilized
                },
                properties: {
                    monitorcode: e[i].monitorcode,
                    comment: e[i].comment,
                    emergency_service: e[i].emergency_service,
                    priority_code: e[i].priority_code,
                    region: e[i].region,
                    pub_date: e[i].pub_date
                }
                 });
                
            }
            console.log(geojson)
            return geojson;
        }

        //function: transform clients to geojson
        function clientJsonToGeoJson(e) {
            var geojson = {
                type: 'FeatureCollection',
                features: []
              };
            var length = Object.keys(e).length;
            
            for (var i = 0; i < length; i++) {
                var location = e[i].client_location
                var regex = /\d{1,}.\d{4,}\s\d{1,}.\d{4,}/;
                var location_filtered = location.match(regex)
                var located = location_filtered[0]
                var locatid = located.split(' ')
                var locilized = []
                locilized.push(locatid[0])
                locilized.push(locatid[1])
                geojson.features.push({
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: locilized
                    },
                    properties: {
                        name: e[i].name,
                        address: e[i].address,
                    }
              });
              
            } 
            return geojson;
        }
    }

      



    render(){
        return (
            <div ref={el => (this.mapContainer = el)} className="minimapPosition" />
        )
    }


}



export default Minimap