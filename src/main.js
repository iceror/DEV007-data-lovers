import { getCharacters, computeStats, sortData } from './data.js';

async function createCards() {
  const characters = await getCharacters();
  characters.got.forEach(character => {
    const card = document.createElement('div');
    card.className = 'character-card show';
    card.id = `${character.firstName} ${character.lastName} ${character.family} ${character.title}`
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

/* RENDER CATEGORIES IN FILTER-BAR BUTTONS */

async function renderCategory(categoryName) {
  const dataArray = await getCharacters();

  const selectElement = document.getElementById(`${categoryName}-select`);

  const viewAllCharactersBtn = document.getElementById('view-all');
  viewAllCharactersBtn.addEventListener("click", () => {
    selectElement.selectedIndex = 0;
    selectElement.dispatchEvent(new Event('change'));
    document.getElementById('search-input').value = '';
  });

  //MAP TO GET SINGLE CATEGORY 
  const singleCategory = dataArray.got.map(character => {
    return eval(`character.${categoryName}`)
  });

  //GET UNIQUE ELEMENTS
  function getUnique(value, index, array) {
    return array.indexOf(value) === index;
  }

  var unique = singleCategory.filter(getUnique);

  //SORT A-Z CATEGORIES IN OPTION BTNS  
  for (let i = 0; i < unique.length; i++) {
    unique.sort();
    let option = document.createElement("option");
    option.value = unique[i];
    option.text = unique[i];
    selectElement.appendChild(option);
  }

  //RENDER CATEGORIES AFTER SELECTING OPTION
  selectElement.addEventListener("change", (event1) => {
    let selectOption = event1.target.value;
    loopCharacterSection(selectOption);
  });

  //GET SEARCH INPUT && TRIGGER LOOP CHARACTER FUNCTION (RENDER CATEGORIES WHILE WRITING)
  let searchInput = document.getElementById('search-input');

  searchInput.addEventListener("keyup", () => {
    loopCharacterSection();
  });

  function loopCharacterSection(selectedOption) {
    let characterSection = document.getElementById('characters').getElementsByClassName('character-card');
    let searchInputValue = document.getElementById('search-input').value;

    for (let characterCard of characterSection) {
      if (!selectedOption) {
        if (searchInputValue && (characterCard.id.toUpperCase()).includes(searchInputValue.toUpperCase())) {
          characterCard.classList.add('show');
          characterCard.classList.remove('hide');
        } else {
          characterCard.classList.add('hide');
          characterCard.classList.remove('show');
        }
      } else {
        if (characterCard.id.includes(selectedOption) || (selectedOption === 'Nombre' || selectedOption === 'Apellido' || selectedOption === 'Casa/Familia' || selectedOption === 'Título')) {
          characterCard.classList.add('show');
          characterCard.classList.remove('hide');
        } else {
          characterCard.classList.add('hide');
          characterCard.classList.remove('show');
        }
      }
    }
  }

}

// SORT CHARACTERS && SHOW CHARACTERS SORTED 
async function sortCards() {
  let sortButton = document.getElementById('sort-by');
  let sortOrder = 'ascending';
  let clickCount = 0;

  sortButton.addEventListener('click', async () => {
    clickCount++;
    if (clickCount % 2 === 0) {
      sortOrder = 'descending';
    } else {
      sortOrder = 'ascending';
    }

    let sortedData = await sortData( sortOrder);

    let characterSection = document.getElementById('characters');
    let characterSectionCards = document.getElementsByClassName('character-card show');

    let sortedCardArray = [];

    sortedData.forEach(sortedItem => {
      for (const characterCard of characterSectionCards) {
        if (characterCard.id.includes(sortedItem + ' ')) {
          sortedCardArray.push(characterCard);
        } 
      }
    });

    sortedCardArray.forEach(element => {
      characterSection.appendChild(element);
    });
  });
}

createCards();

renderCategory("firstName");
renderCategory("lastName");
renderCategory("family");
renderCategory("title");

sortCards();
computeStats();

