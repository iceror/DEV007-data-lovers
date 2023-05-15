import { example } from './data.js';

//import data from './data/got/got.js';

// async function getCharacters() {
//   await fetch('./data/got/got.json')
//     .then((response) => response.json())
//     .then((json) => { return json });
// }


async function getCharacters() {
  const response = await fetch('./data/got/got.json');
  const json = await response.json();
  console.log(json);
  return json;
}

async function createCards() {
  let characters = await getCharacters();
  characters.got.forEach(character => {
    const card = document.createElement('div');
    card.innerHTML = ` 
  <img src='${character.imageUrl}'>
  <h2>${character.firstName}</h2>
  <h3>${character.lastName}</h3>
  <h4>${character.family}</h4>
  <h5>${character.title}</h5>
  <h5>${character.born}</h5>
  `

    document.querySelector(`#characters`).appendChild(card);

  });
}

createCards();