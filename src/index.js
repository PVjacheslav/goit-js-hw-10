import SlimSelect from 'slim-select';
import Notiflix, { Notify } from 'notiflix';

import { fetchBreeds, fetchCatByBreed } from './cat-api';

const elements = {
  searchSelect: document.querySelector('select.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  container: document.querySelector('.cat-info'),
};

function renderBreedSelect(breeds) {
  const markup = breeds
    .map(breed => `<option value='${breed.id}'>${breed.name}</option>`)
    .join('');
  elements.searchSelect.innerHTML = markup;
  elements.searchSelect.value = null; // Очищення вибраного значення
}

function renderCatCard(info) {
  let breed = info.breeds[0];
  const markup = `<img class="image" src="${info.url}" alt="${breed.name}"  width="400">
  <div class="content">
  <h2 class="title">${breed.name}</h2>
  <p class="description">${breed.description}</p>
  <p><span class="temperament">Temperament: </span>${breed.temperament}</p>
  <p class="link">More information: <a href="${breed.wikipedia_url}" target="_blank">Wikipedia</a></p>
  </div>`;
  elements.container.innerHTML = markup;
}

elements.searchSelect.addEventListener('change', () => {
  const selectedBreedId = elements.searchSelect.value;
  elements.loader.style.display = 'block';
  elements.error.style.display = 'none';
  fetchCatByBreed(selectedBreedId)
    .then(data => {
      renderCatCard(data[0]);
    })
    .catch(error => {
      console.log(error);
      elements.error.style.display = 'block';
    })
    .finally(() => {
      elements.loader.style.display = 'none';
    });
});

fetchBreeds()
  .then(renderBreedSelect)
  .catch(error => {
    console.log(error);
    elements.error.style.display = 'block';
  });
