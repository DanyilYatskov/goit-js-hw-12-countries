import refs from './references';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';
import renderCountries from './renderCountries';
function inputHandler(event) {
  const country = event.target.value;
  fetchCountries(country).then(countries =>
    renderCountries(countries, refs.countriesListRef),
  );
}
refs.cNameInputRef.addEventListener('input', debounce(inputHandler, 500));
