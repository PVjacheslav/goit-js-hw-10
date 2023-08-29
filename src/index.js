import { fetchBreeds, fetchCatByBreed } from './cat-api';

const elements = {
  searchSelect: document.querySelector('select.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  container: document.querySelector('.cat-info'),
};

function renderBreedSelect(breeds) {
  const markup = breeds
    .map(
      breed =>
        `<option value='${breed.reference_image_id}'>${breed.name}</option>`
    )
    .join('');
  elements.searchSelect.insertAdjacentHTML('beforeend', markup);
  elements.searchSelect.value = null; // Очищення вибраного значення
}

fetchBreeds().then(renderBreedSelect);
function renderCatCard(info) {
  let breed = info.breeds[0];
  const markup = `<img class="image" src="${info.url}" alt="${breed.name}" height="${info.height}" width="${info.width}">
  <div class="content">
  <h2 class="title">${breed.name}</h2>
  <p class="description">${breed.description}</p>
  <p><span class="temperament">Temperament: </span>${breed.temperament}</p>
  <p class="link">More information: <a href="${breed.wikipedia_url}" target="_blank">Wikipedia</a></p>
  </div>`;
  elements.container.innerHTML = markup;
}
elements.searchSelect.addEventListener('change', () => {
  fetchCatByBreed(elements.searchSelect.value)
    .then(date => console.log(date))
    .then(result => {
      renderCatCard(result);
    })
    .catch(error => console.log(error));
});
