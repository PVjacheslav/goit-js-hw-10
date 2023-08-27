import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_SVj1aIeXMYYbjko4jsELVaTWh5G7QRZpDR6dEKTmG2xnihIaIjOmFSolCblWAzhx';

function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com/v1/breeds';

  return axios
    .get(BASE_URL)
    .then(response => response.data)
    .catch(err => error(err));
}

function fetchCatByBreed(breedId) {
  const BASE_URL = 'https://api.thecatapi.com/v1/images/search';

  return axios
    .get(BASE_URL)
    .then(response => response.data)
    .catch(err => error(err));
}

export { fetchBreeds, fetchCatByBreed };
