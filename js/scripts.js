
// Iterates through list and checks to see if height is greater than 5
// Displays the name and height 

const pokemonRepository = (function () {
  let pokemonList = [
    { name: 'Squirtle', height: 5, types: 'Water' },
    { name: 'Dewgong', height: 1.7, types: ['Ice', 'Water'] },
    { name: 'Slowpoke', height: 1.2, types: ['Psychic', 'Water '] },
    { name: 'Alcremie', height: 1, types: 'Fairy' },
    { name: 'Igglybuff', height: 1, types: 'Fairy' },
    { name: 'Bulbasaur', height: 7, types: ['Grass', 'Poison'] },
    { name: 'Chikorita', height: 2.11, types: 'Grass' },
  ];



  function add(pokemon) {
    if (typeof pokemon === "object") {
      pokemonList.push(pokemon);
    }
  }

  function getAll() {
    return pokemonList;
  }


  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let pokemonItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    pokemonItem.appendChild(button);
    pokemonList.appendChild(pokemonItem);
  }


  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem


  };


})();

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: 'Butterfree', height: 3, type: 'Bug' });
pokemonRepository.add("coucou"); // testing pokemon is not an object 
console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});





// const pokemonIsTall = pokemon.height > 5; 
    // document.write(`<div class='grid-item'> ${pokemon.name} (Height: ${pokemon.height})
    // ${pokemonIsTall ? "<span> Wow that is a big pokemon! </span>" : ""} </div> <br>`);



