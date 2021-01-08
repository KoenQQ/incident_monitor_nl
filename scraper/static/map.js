
const map = L.map('map').setView([52.10, 5.64], 8);

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: attribution }).addTo(map);


var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Location: " + e.latlng.toString())
        .openOn(map);
    
    //query db
}

map.on('click', onMapClick);

//UPDATE NAAR MAPBOX
// L.tileLayer.provider('MapBox', {
//     id: 'mapbox://styles/kdebrauw/ckbc2iy8j0tvc1inn5bz99irc',
//     accessToken: 'pk.eyJ1Ijoia2RlYnJhdXciLCJhIjoiY2p4ZnhyaTUzMDB1eTQxbnVwOG9jbHBwdSJ9.L5RCSfMVV7RYpq1a45E68g'
// }).addTo(map);