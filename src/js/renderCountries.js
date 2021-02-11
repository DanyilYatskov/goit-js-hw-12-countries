import { info, alert } from '@pnotify/core';
import PNotify from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import * as Confirm from '@pnotify/confirm';
import '@pnotify/confirm/dist/PNotifyConfirm.css';
import countriesListTemplate from '../templates/countriesListTemplate.hbs';
import singleCountryTmp from '../templates/singleCountryTmp.hbs';
export default function renderCountries(itemList, ref) {
  ref.innerHTML = '';

  if (itemList.length > 10) {
    notice(info, 'Be more specific');
    return;
  } else if (itemList.status == '404') {
    notice(alert, 'There is no such country on planet Earth.');
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
function notice(type, message) {
  type({
    title: 'Cannot find your country',
    text: message,

    modules: new Map([
      [
        Confirm,
        {
          confirm: true,
          buttons: [
            {
              text: 'Ok',
              primary: true,
              click: notice => {
                notice.close();
              },
            },
          ],
        },
      ],
    ]),
  });
}
