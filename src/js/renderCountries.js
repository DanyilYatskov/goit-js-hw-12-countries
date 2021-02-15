import { info, alert } from '@pnotify/core';
import PNotify from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import * as Confirm from '@pnotify/confirm';
import '@pnotify/confirm/dist/PNotifyConfirm.css';
import countriesListTemplate from '../templates/countriesListTemplate.hbs';
import singleCountryTmp from '../templates/singleCountryTmp.hbs';
import fetchCountries from './fetchCountries';
import refs from './references';
export default function renderCountries(itemList, ref) {
  ref.innerHTML = '';
  if (itemList.status == '404') {
    notice(
      alert,
      'Cannot find your country',
      'There is no such country on planet Earth.',
    );
    ref.style.borderStyle = 'none';
    return;
  } else if (itemList.length > 10) {
    notice(info, 'To many matches found', 'Pls be more specific');
    ref.style.borderStyle = 'none';
  } else if (itemList.length == 1) {
    render(itemList, singleCountryTmp, ref);
    refs.cNameInputRef.value = '';
    refs.countriesListRef.removeEventListener('click', onCountryClick);
  } else {
    render(itemList, countriesListTemplate, ref);
    refs.countriesListRef.addEventListener('click', onCountryClick);
  }
}
function render(itemList, template, ref) {
  const markup = template(itemList);
  ref.insertAdjacentHTML('beforeend', markup);
  ref.style.borderStyle = 'solid';
}
function notice(type, header, message) {
  type({
    title: header,
    text: message,
  });
}
function onCountryClick(event) {
  const country = event.target.textContent;
  if (country == '' || event.target.tagName !== 'LI') {
    return;
  }
  fetchCountries(country).then(countries =>
    renderCountries(countries, refs.countriesListRef),
  );
}
