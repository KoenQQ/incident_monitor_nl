
// API STUFF
import axios from 'axios'


// AXIOS STUFF
axios.interceptors.request.use(x => {
    console.log(x);
    return x;
  });
  
  axios.defaults.headers.common['WWW-Authenticate'] = localStorage.getItem('token');
  
  // interceptor that puts call details in console
  axios.interceptors.response.use(x => {
    console.log(x)
    return x;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
  
  // AXIOS STUFF END 
  


export function getUser() {
    return axios.get( 'https://www.incidentradar.com/scraper/current_user/', {
        headers: {
            'WWW-Authenticate': localStorage.getItem('token')
        }          
    })

}

export function getIncidentHits(username) {
    return axios.get( '/scraper/api/incidentHits', {
        headers: {
            'WWW-Authenticate': localStorage.getItem('token')
        },
        params: {
            'user': username
        },

    })

}