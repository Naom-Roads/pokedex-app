let pokemon = [
  { name: 'Bulbasaur', height: 7, types: ['Grass', 'Poison'] },
  { name: 'Squirtle', height: 5, types: 'Water' },
  { name: 'Wigglytuff', height: 1, types: ['Fairy', 'Normal'] },
  { name: 'Slowpoke', height: 1.2, types: ['Psychic', 'Water '] },
  { name: 'Dewgong', height: 1.7, types: ['Ice', 'Water'] },

];

for ( let i=0; i < pokemon.length ; i++ ) {
  document.write(" " + pokemon[i].name + " (Height: " + pokemon[i].height + ")") ;
}


