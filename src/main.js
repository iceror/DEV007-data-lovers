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
async function getCategories() {
  const nameSelect = document.getElementById('name-select');
  const lastNameSelect = document.getElementById('last-name-select');
  const houseSelect = document.getElementById('house-select');
  const titleSelect = document.getElementById('title-select');
  const dataArray = await getCharacters();
  //MAP TO GET ALL CATEGORIES 
  let allNames = dataArray.got.map(character => character.firstName);
  let allLastNames = dataArray.got.map(character => character.lastName);
  let allHouses = dataArray.got.map(character => character.family);
  let titles = dataArray.got.map(character => character.title);

  function renderNames() {
    allNames.sort();
    for (let i = 0; i < allNames.length; i++) {
      var option = document.createElement("option");
      option.value = allNames[i];
      option.text = allNames[i];
      nameSelect.appendChild(option);
    }
  }

  //GET UNIQUE LAST NAMES 
  function getUniqueLastNames(value, index, array) {
    return array.indexOf(value) === index;
  }

  function renderLastNames() {
    let uniqueLastNames = allLastNames.filter(getUniqueLastNames);
    uniqueLastNames.sort();
    for (let i = 0; i < uniqueLastNames.length; i++) {
      var option = document.createElement("option");
      option.value = uniqueLastNames[i];
      option.text = uniqueLastNames[i];
      lastNameSelect.appendChild(option);
    }
  }

  //GET UNIQUE HOUSES
  function getUniqueHouses(value, index, array) {
    return array.indexOf(value) === index;
  }

  function renderHouses() {
    let uniqueHouses = allHouses.filter(getUniqueHouses);
    uniqueHouses.sort();
    for (let i = 0; i < uniqueHouses.length; i++) {
      var option = document.createElement("option");
      option.value = uniqueHouses[i];
      option.text = uniqueHouses[i];
      houseSelect.appendChild(option);
    }
  }

  function renderTitles() {
    titles.sort();
    for (let i = 0; i < titles.length; i++) {
      var option = document.createElement("option");
      option.value = titles[i];
      option.text = titles[i];
      titleSelect.appendChild(option);
    }
  }

  renderNames();
  renderLastNames();
  renderHouses();
  renderTitles();
}

getCategories();