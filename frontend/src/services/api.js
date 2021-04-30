// API STUFF
import axios from 'axios';

// AXIOS STUFF

const apiUrl = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(x => {
  console.log(x);
  return x;
});

// interceptor that puts call details in console
axios.interceptors.response.use(
  x => {
    console.log(x);
    return x;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

// AXIOS STUFF END

//Returns the user determined by token in localstorage
export function getUser() {
  return axios.get(`${apiUrl}/scraper/current_user/`, {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  });
}

// returns hits relevant for the user
export function getIncidentHits() {
  return axios.get(`${apiUrl}/scraper/api/incidentHits/`, {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  });
}

// returns tracked/client locations for the user
export function getClientLocations() {
  return axios.get(
    `${apiUrl}/scraper/api/clientlocationlist`,
    {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    }
  );
}

// add a new client location to tracked locations
export function addClientLocation(data) {
  return axios.post(
    `${apiUrl}/scraper/api/addclientlocation`,
    {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    }
  );
}

// remove client location from tracked locations
export function removeClientLocation(data) {
  return axios.delete(
    `${apiUrl}/scraper/api/addclientlocation`,
    {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    }
  );
}
