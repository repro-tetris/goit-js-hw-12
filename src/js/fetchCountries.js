import env from '../js/env.js';
export function fetchCountries(name) {
  console.log('name=', name);
  return fetch(`${env.countriesUrl}${name}?fields=name;capital;population;flag;languages`).then(
    response => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.json();
    },
  );
}
