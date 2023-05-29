import { computeStats } from "./data.js";
const lastNameChart = document.getElementById('lastName-chart');
const familyChart = document.getElementById('family-chart');


const { lastNameCount, houseCount } = await computeStats();
console.log(lastNameCount);
console.log(houseCount);

let colorArray = [];

Object.keys(lastNameCount).forEach(element => {
  let red = Math.floor(Math.random() * 256);
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);
  colorArray.push(`rgb(${red}, ${green}, ${blue})`);
}) ;


new Chart(lastNameChart, {
  type: 'doughnut',
  data: {
    labels: Object.keys(lastNameCount),
    datasets: [{
      label: 'Members',
      data: Object.values(lastNameCount),
      backgroundColor: colorArray,
      hoverOffset: 4
    }]
  }
});

new Chart(familyChart, {
  type: 'doughnut',
  data: {
    labels: Object.keys(houseCount),
    datasets: [{
      label: 'Members',
      data: Object.values(houseCount),
      backgroundColor: colorArray,
      hoverOffset: 4
    }]
  }
});
