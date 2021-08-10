

const waterPokemon = [
  { name: 'Squirtle', height: 5, types: 'Water' },
  { name: 'Dewgong', height: 1.7, types: ['Ice', 'Water'] },
  { name: 'Slowpoke', height: 1.2, types: ['Psychic', 'Water '] },
];

const fairyPokemon = [
{ name: 'Alcremie', height: 1, types: 'Fairy' },
{ name: 'Igglybuff', height: 1, types: 'Fairy' },
];

const grassPokemon = [
  { name: 'Bulbasaur', height: 7, types:['Grass', 'Poison'] },
  { name: 'Chikorita', height: 2.11, types: 'Grass' },
];



// Iterates through list and checks to see if height is greater than 5, then it displays the name and height


function printArray(list) {
  for (let i=0; i < list.length; i++) {
    const pokemonIsTall = list[i].height > 5; 
      document.write(`<div class='grid-item'> ${list[i].name} (Height: ${list[i].height})
      ${pokemonIsTall ? "<span> Wow that is a big pokemon! </span>" : ""} </div> <br>`);
 }
}

document.write("<div class='grid'>");
printArray(waterPokemon);
printArray(fairyPokemon);
printArray(grassPokemon);
document.write("</div>");
