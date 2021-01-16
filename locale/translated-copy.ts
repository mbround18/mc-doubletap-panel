import {get, template} from 'lodash';
import en_us from './en_us.json';
const locales = {
  en_us
};

function translatedCopy(key: string, values?: any) {
  const locale = localStorage.getItem('locale') ?? 'en_us';
  const selectedLocal = get(locales, locale);
  const translation = get(selectedLocal, key, 'no translation found');
  const compile = template(translation);
  return compile(values);
}

export default translatedCopy;
