import { example } from './data.js';

//import data from './data/got/got.js';

function getCharacters() {
  fetch('./data/got/got.json')
    .then((response) => response.json())
    .then((json) => {return json});
}

getCharacters();