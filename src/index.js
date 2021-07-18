import './css/styles.css';
import { debounce } from 'lodash';
import { fetchCountries } from './js/fetchCountries';
import countryListTpl from './templates/countriesTemplate.hbs';
import countryTpl from './templates/countryTemplate.hbs';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchBoxEl: document.querySelector('#search-box'),
  countryListEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.country-info'),
};

refs.searchBoxEl.addEventListener('input', debounce(searchBoxListener, DEBOUNCE_DELAY));

function searchBoxListener(e) {
  const searchText = e.target.value;
  if (searchText.length === 0) {
    clearCountriesListEl();
  } else {
    fetchCountries(searchText)
      .then(countries => {
        if (countries.length === 1) {
          console.log(countries[0]);
          setCountriesListEl(countryTpl(countries[0]));
        } else if (countries.length >= 2 && countries.length <= 10) {
          setCountriesListEl(countryListTpl(countries));
        } else {
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        }
      })
      .catch(error => {
        console.log(error);
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }
}

function setCountriesListEl(data) {
  refs.countryListEl.innerHTML = data;
}
function clearCountriesListEl() {
  refs.countryListEl.innerHTML = '';
}
