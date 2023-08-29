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

elements.searchSelect.addEventListener('change', onChangeSelect);

function renderBreedSelect(breeds) {
  const markup = breeds
    .map(
      breed =>
        `<option value='${breed.reference_image_id}'>${breed.name}</option>`
    )
    .join('');
  elements.searchSelect.insertAdjacentHTML('beforeend', markup);
  new SlimSelect({
    select: '#selectElement',
  });
  elements.searchSelect.value = null; // Очищення вибраного значення
}

function fetchBreedsRender() {
  elements.loader.start;
  fetchBreeds()
    .then(elements => console.log(elements))
    .then(breeds => renderBreedSelect(breeds))
    .catch(err => {
      console.log(err);
      Notify.failure('Oops! Something went wrong!');
    })
    .finally(() => {
      evt.target.reset(), loader.stop();
    });
}

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

function onChangeSelect(e) {
  elements.loader.start();
  const breedId = e.target.value;
  fetchCatByBreed(breedId)
    .then(breed => renderCatCard(json))
    .catch(err => {
      console.log(err);
      Notify.failure('Oops! Something went wrong!');
    })
    .finally(() => {
      evt.target.reset(), loader.stop();
    });
}
