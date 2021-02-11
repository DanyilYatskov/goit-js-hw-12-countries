import { alert, notice, info, success, error } from '@pnotify/core';
import { defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/core';
import countriesListTemplate from '../templates/countriesListTemplate.hbs';
import singleCountryTmp from '../templates/singleCountryTmp.hbs';
export default function renderCountries(itemList, ref) {
  ref.innerHTML = '';

  if (itemList.length > 10) {
    ref.insertAdjacentHTML('beforeend', 'Be more specific');
    return;
  } else if (itemList.status == '404') {
    ref.insertAdjacentHTML('beforeend', 'No such country in the World');
    return;
  } else if (itemList.length == 1) {
    render(itemList, singleCountryTmp, ref);
  } else {
    render(itemList, countriesListTemplate, ref);
  }
}
function render(itemList, template, ref) {
  const markup = template(itemList);
  ref.insertAdjacentHTML('beforeend', markup);
  ref.style.borderStyle = 'solid';
}
