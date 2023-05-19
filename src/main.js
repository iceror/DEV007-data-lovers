import { example } from './data.js';

async function getCharacters() {
  const response = await fetch('./data/got/got.json');
  const json = await response.json();
  //console.log(json);
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

/* RENDER CATEGORIES IN FILTER-BAR BUTTONS */
//name, lastname, house, title

async function renderCategory(categoryName) {
  const dataArray = await getCharacters();

  const selectElement = document.getElementById(`${categoryName}-select`);

  //MAP TO GET SINGLE CATEGORY 
  let singleCategory = dataArray.got.map(character => {
    return eval(`character.${categoryName}`)
  });

  //GET UNIQUE ELEMENTS
  function getUnique(value, index, array) {
    return array.indexOf(value) === index;
  }

  var unique = singleCategory.filter(getUnique);

  for (let i = 0; i < unique.length; i++) {
    unique.sort();
    let option = document.createElement("option");
    option.value = unique[i];
    option.text = unique[i];
    selectElement.appendChild(option);
  }
}

renderCategory("firstName");
renderCategory("lastName");
renderCategory("family");
renderCategory("title");