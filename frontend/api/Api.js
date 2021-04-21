
// API STUFF
import axios from 'axios'


// AXIOS STUFF

    axios.interceptors.request.use(x => {
        console.log(x);
        return x;
    });

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
  

//Returns the user determined by token in localstorage
export function getUser() {
    return axios.get( 'https://www.incidentradar.com/scraper/current_user/', {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }         
    })

}

// returns hits relevant for the user
export function getIncidentHits() {
    return axios.get( 'https://www.incidentradar.com/scraper/api/incidentHits/', {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }

    })

}


// returns tracked/client locations for the user
export function getClientLocations() {
    return axios.get( 'https://www.incidentradar.com/scraper/api/clientlocationlist/', {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    })

}