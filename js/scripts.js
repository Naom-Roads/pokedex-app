
// Iterates through list and checks to see if height is greater than 5
// Displays the name and height 

const pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


  function add(pokemon) {
    if (typeof pokemon === "object") {
      pokemonList.push(pokemon);
    }
  }

  function getAll() {
    return pokemonList;
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
     });
    }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let pokemonItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    pokemonItem.appendChild(button);
    pokemonList.appendChild(pokemonItem);
    button.addEventListener('click', function() { showDetails(pokemon)} );

  }

  function loadList() {
    return fetch(apiUrl).then(function(response) {
      return response.json(); 
   }).then(function (json) {
     json.results.forEach(function (item) {
       let pokemon = {
         name: item.name, 
         detailsUrl: item.url
       };
       add(pokemon);
     });
    }).catch(function (e) {
      console.error(e); 
    });
   }

   function loadDetails(item) { 
   let url= item.detailsUrl; 
   return fetch(url).then(function (response) {
     return response.json();
   }).then(function (details) {
     item.imageURL = details.sprites.front_default; 
     item.height = details.height; 
     item.types = details.types; 
   }).catch(function (e) {
      console.error(e); 
    }); 
   }

   

  return {
    add:add, 
    getAll: getAll, 
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    addListItem: addListItem
  }; 
})(); 

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
}); 