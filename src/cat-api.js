import axios from 'axios';
import Notiflix, { Notify } from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
  'live_j2zFr2O5hILE2e2zbtlJ4lNqGuTRZHE5Sko8sEQZc3OiVDSV2ohRulPSJSLBy5JJ';
function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      console.log(error);
      Notify.failure('Oops! Something went wrong!');
    });
}
function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      console.log(error);
      Notify.failure('Oops! Something went wrong!');
    });
}
export { fetchBreeds, fetchCatByBreed };
