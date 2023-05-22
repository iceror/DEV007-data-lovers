import dataGot from "./data/got/got.json" assert { type: "json" };
//console.log(dataGot);

document.getElementById("filteredCards");

let createCards = dataGot.got.map((character) => {
  const card = document.createElement("div");
  card.firstName = "character-card";
  card.innerHTML = `
  
`;
});

let families = dataGot.got.map((character) => {
  let filteredFamilies = [];
  filteredFamilies.includes(character.family)
    ? console.log("Ya existe")
    : filteredFamilies.push(character.family);
  return filteredFamilies;
});

function filterData(array, filterName) {
  let result = [];
  array.map((elem) => {
    result.includes(elem.filterName) ? null : result.push(elem.filterName);
  });
  console.log(result);
}

filterData(dataGot.got, "family");
