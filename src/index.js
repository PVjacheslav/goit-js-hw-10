import axios from 'axios';
import SlimSelect from 'slim-select';
import Notiflix, { Notify } from 'notiflix';
axios.defaults.headers.common['x-api-key'] =
  'live_SVj1aIeXMYYbjko4jsELVaTWh5G7QRZpDR6dEKTmG2xnihIaIjOmFSolCblWAzhx';

import { fetchBreeds, fetchCatByBreed } from './cat-api';

const elements = {
  searchSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  container: document.querySelector('.cat-info'),
};

// elements.searchSelect.addEventListener('change', handlerSearch);
function renderBreedSelect(json) {
  const markup = json
    .map(el => `<option value='${el.id}'>${el.name}</option>`)
    .join('');
  elements.searchSelect.insertAdjacentHTML('beforeend', markup);
  new SlimSelect({
    select: '#selectElement',
  });
  elements.searchSelect.value = null; // Очищення вибраного значення
}

fetchBreeds()
  .then(elements => console.log(elements))
  .then(renderBreedSelect)
  .catch(err => {
    console.log(err);
    Notify.failure('Qui timide rogat docet negare');
  })
  .finally(() => evt.target.reset());

function renderCatCard(json) {
  const breedInfo = json[0].breeds[0];
  const img = {
    url: json[0].url,
    alt: breedInfo.name,
  };
  const markup = `
    <h2 class="header">${breedInfo.name}</h2>
    <div class="card">
      <img src="${img.url}" alt="Cat breed ${img.alt}" class="image">
      <div class="description">
        <p class="text">${breedInfo.description}</p>
        <p class="text"><b>Temperament:</b> ${breedInfo.temperament}</p>
      </div>
    </div>
  `;
  elements.container.innerHTML = markup;
}

fetchCatByBreed(breedId)
  .then(breed => renderCatCard(json))
  .catch(err => {
    console.log(err);
    Notify.failure('Qui timide rogat docet negare');
  })
  .finally(() => evt.target.reset());
