import dataGot from "./data/got/got.json" assert { type: "json" };
//console.log(dataGot);

document.getElementById("filteredCards");

let createCards = dataGot.got.map((character) => {
  const card = document.createElement("div");
  card.firstName = "character-card";
  card.innerHTML = `
  
`;
});
