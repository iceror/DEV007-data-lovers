/* BRING DATA FROM JSON */
export async function getCharacters() {
  const response = await fetch('./data/got/got.json');
  const json = await response.json();
  // console.log(json);
  return json;
}

/* SHOW PERCENTAGE OF FAMILY MEMBERS*/ 
export async function computeStats(){
  const data = await getCharacters();
  console.log(data);
}