const elements = {
  searchSelect: document.querySelector('.breed-select'),
  container: document.querySelector('.cat-info'),
};

import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

axios.defaults.headers.common['x-api-key'] =
  'live_SVj1aIeXMYYbjko4jsELVaTWh5G7QRZpDR6dEKTmG2xnihIaIjOmFSolCblWAzhx';

elements.searchSelect.addEventListener('change', handlerSearch);

fetchBreeds()
  .then(elements => console.log(elements))
  .then(data => (elements.container.innerHTML = createMarkup(data)))
  .catch(err => console.log(err))
  .finally(() => evt.target.reset());

function createMarkup() {
  const { url } = arr[0];
  const { name, description, temperament } = arr[0].breeds[0];
  return;
}

// function createMarkup(arr) {
//   return arr
//     .map(
//       ({ reference_image_id, name, description, temperament }) =>
//         ` <li>
//         <img src="${reference_image_id}.jpg" alt="${name}">
//         <h2>${name}</h2>
//         <p>${description}</p>
//         <p>${temperament}</p>
//       </li>`
//     )
//     .join('');
// }
