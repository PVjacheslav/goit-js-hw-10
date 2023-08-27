const elements = {
  searchSelect: document.querySelector('.breed-select'),
  container: document.querySelector('.cat-info'),
};

import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

axios.defaults.headers.common['x-api-key'] =
  'live_SVj1aIeXMYYbjko4jsELVaTWh5G7QRZpDR6dEKTmG2xnihIaIjOmFSolCblWAzhx';

elements.searchSelect.addEventListener('change', fetchBreeds);

// const { url } = arr[0];
// const { name, description, temperament } = arr[0].breeds[0];
