import { get, template } from "lodash"
// eslint-disable-next-line camelcase
import en_us from "./en_us.json"
const locales = {
  en_us
}

function translatedCopy (key: string, values?: any) {
  const defaultLocale = "en_us"
  const locale = process.browser
    ? localStorage.getItem("locale")
    : defaultLocale
  const selectedLocal = get(locales, locale ?? defaultLocale)
  const translation = get(selectedLocal, key, `no translation found: ${key}`)
  const compile = template(translation)
  return compile(values ?? {})
}

export default translatedCopy
