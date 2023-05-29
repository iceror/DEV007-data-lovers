//BRING DATA FROM JSON 
export async function getCharacters() {
  const response = await fetch('./data/got/got.json');
  const json = await response.json();
  // console.log(json);
  return json;
}

//SHOW NUMBER OF FAMILY MEMBERS
export async function computeStats() {
  const data = await getCharacters();

  let lastNames = [];
  lastNames = data.got.map(character => {
    return character.lastName;
  });

  let houses = [];
  houses = data.got.map(character => {
    return character.family;
  });

  const lastNameCount = {};
  const houseCount = {};

  data.got.forEach((character) => {
    const { lastName, family } = character;
    if (lastNameCount[lastName]) {
      lastNameCount[lastName]++;
    } else {
      lastNameCount[lastName] = 1;
    }

    if (houseCount[family]) {
      houseCount[family]++;
    } else {
      houseCount[family] = 1;
    }

  });
  console.log(lastNameCount);
  console.log(houseCount);
  return { lastNameCount, houseCount };
}

// SORT DATA 
export async function sortData(sortOrder) {
  const array = await getCharacters();
  const data = array.got.map(character => `${character.firstName}`);

  if (sortOrder === 'ascending') {
    const ascendingData = data.sort();
    return ascendingData;

  } else if (sortOrder === 'descending') {
    const descendingData = data.sort().reverse();
    return descendingData;
  }
}

