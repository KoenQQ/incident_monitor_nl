

import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl, { LngLat } from 'mapbox-gl';
import * as axios from 'axios';
import "/templates/site.css"

// test
mapboxgl.accessToken = 'pk.eyJ1Ijoia2RlYnJhdXciLCJhIjoiY2p4ZnhyaTUzMDB1eTQxbnVwOG9jbHBwdSJ9.L5RCSfMVV7RYpq1a45E68g';

class Application extends React.Component {
  // deze kan later nog in eigen doc komen
  constructor(props) {
    super(props);
    this.state = {
      lng: 5.8,
      lat: 52,
      zoom: 7
    };
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/kdebrauw/ckaxjbuh50ohl1ioo470azefc',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });

    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

    map.on('click', event => {
      const { lat, lng } = event.lngLat;
      
      new mapboxgl.Popup({
        color: "#2A3C47"
        })
        .setLngLat(event.lngLat)
        .setText("What happened here in <br> the last 30 days?")
        .addTo(map)

        // localhost: 'http://127.0.0.1:8000/scraper/api/location/'
        // productie: 'https://incident-monitor-nl.herokuapp.com/scraper/api/location/'
      axios.get('https://incident-monitor-nl.herokuapp.com/scraper/api/location/', {
        params: {
          'location-list': `SRID=4326;POINT(${lng} ${lat})`
        }
      }).then(results => { 
        this.results = results.data
        console.log(results.data)
        console.log(jsonToGeoJson(results.data))
        
        if (map.getSource('locaties')) {
          // if layer exists remove old one
          map.removeLayer('locaties_waddan');      
          map.removeSource('locaties');
        };
        
        map.addSource('locaties', {
          type: 'geojson',
          data: jsonToGeoJson(results.data),
        })
      
        

        map.addLayer({
          'id': 'locaties_waddan',
          'type': 'circle',
          'source': 'locaties',
          'paint': {
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
 
        map.on('mouseenter', 'locaties_waddan', function(e) {
          map.getCanvas().style.cursor = 'pointer';

          var coordinates = e.features[0].geometry.coordinates.slice();
          var monitorcode = e.features[0].properties.monitorcode;
          var comment = e.features[0].properties.comment;
          var emergency_service = e.features[0].properties.emergency_service;
          var priority_code = e.features[0].properties.priority_code;
          var pub_date = e.features[0].properties.pub_date;
          
          // console.log(coordinates);
          console.log(monitorcode);
            
          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.

          // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          // coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          // }
          
          popup_extra
          .setLngLat(coordinates)
          .setHTML('<H3> Incident </H3>' + pub_date + '<br> <br> Priority: ' + priority_code + '<br> <br> Message: ' + comment)
          .addTo(map);

          
          
        });
    
        map.on('mouseleave', 'locaties_waddan', function() {
          map.getCanvas().style.cursor = '';
          popup_extra.remove();
        });

      });
      

    });

    function jsonToGeoJson(e) {
      
      var geojson = {
        type: "FeatureCollection",
        features: [],
      };
      var length = Object.keys(e).length

      for ( var i = 0; i < length; i++) {
        // if (window.CP.shouldStopExecution(1)) {
        //   break;
        // }
        geojson.features.push({
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [e[i].fields.longitude, e[i].fields.latitude]
          },
          "properties": {
            "monitorcode": e[i].fields.monitorcode,
            "comment": e[i].fields.comment,
            "emergency_service": e[i].fields.emergency_service,
            "priority_code": e[i].fields.priority_code,
            "region": e[i].fields.region,
            "pub_date": e[i].fields.pub_date
          }
        });
      }
      
      console.log(geojson)
      // window.CP.exitedLoop(1); test
      // var parsed = GeoJSON.parse(file, {Point: ['fields.latitude', 'fields.longitude']})
      return geojson
    };

    var popup_extra = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

  }


  render() {
    return (
      <div>
        <div className='headerStyle'>
          <div>Incidentradar</div>
        </div>
        <div className='sidebarStyle'>
          <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
        </div>
        <div className='carthaBar'>
          <div>Designed and powered by Cartha</div>
        </div>
        <div className='introbarStyle'>
          <div>Click on the map to explore recent incidents </div>
        </div>
        <div ref={el => this.mapContainer = el} className='mapContainer' />
      </div>
    )
  }
}




ReactDOM.render(<Application />, document.getElementById('app'));

