import { example } from './data.js';

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
    card.className = 'character-card';
    card.innerHTML = ` 
  <div class='background'>
    <img src='./images/cardContainerMiniatura.png'>
    <div class='character-info'>
      <div class='img-container'>
      <img src='${character.imageUrl}'>
      </div>
      <div class='name-container'>
      <h2>${character.firstName}</h2>
      <h3>${character.lastName}</h3>
      </div>
    </div>
  </div>
  `

    document.querySelector(`#characters`).appendChild(card);

  });
}

createCards();

/* TODO RENDER CATEGORIES IN FILTER-BAR BUTTONS */

async function getCategories() {
  const json = await getCharacters();
  console.log(json);
  // GET NAMES, LASTNAMES, ETC. FILTER REPEATED ONES
  //RENDER CATEGORIES/OPTIONS  
}

getCategories();