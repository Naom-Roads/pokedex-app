// Iterates through list and checks to see if height is greater than 5
// Displays the name and height 

const pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // LOADING MESSAGE //

  function showLoadingMessage() {
    let container = document.querySelector('.main');
    let loadmessage = document.createElement('div')
    loadmessage.id = "loading"
    loadmessage.innerText = "Loading..."
    loadmessage.classList.add('loading-class');
    loadmessage.classList.add('animate__animated', 'animate__flash');
    container.prepend(loadmessage);
  } // creates loading and class to show loading message in loadList and loadDetails function

  function hideLoadingMessage() {
    const container = document.querySelector('.main');
    const loadmessage = document.getElementById("loading");
    container.removeChild(loadmessage);
   
  } // clears the message once content is loaded 


  // END OF LOADING MESSAGE CODE // 

  // ADDING AND GETTING POKEMON DETAILS // 

  function add(pokemon) {
    if (typeof pokemon === "object") {
      pokemonList.push(pokemon);
    }
  } // checks that pokemon is an object 

  function getAll() {
    return pokemonList;
  } // returns pokemon list 


  function addListItem(pokemon) {
    let pokemonList = document.querySelector('#list-group');
    let pokemonItem = document.createElement('li');
    pokemonItem.classList.add('list-group-item', 'col-3', 'd-flex', 'justify-content-center', 'border-0');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn', 'btn-warning', 'btn-lg', 'text-capitalize', 'col'); // replace with 'button-class' for custom buttons 
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal')
    pokemonItem.appendChild(button);
    pokemonList.appendChild(pokemonItem);
    button.addEventListener('click', function () {
      showDetails(pokemon)
    });
  }

  function loadList() {
    showLoadingMessage()
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {

      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(console.error).finally(function () {
      hideLoadingMessage()
    });
  }

  function loadDetails(item) {
    console.log(item);
    showLoadingMessage()
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageURL = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(console.error).finally(function () {
      hideLoadingMessage()
    });
  }


  // MODAL STARTS HERE //  

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
   
      const modalHeader = document.getElementById('modal-header');
      modalHeader.innerHTML = ''; 
      const contentBody = document.getElementById('modal-body');
      contentBody.innerHTML = ''; 
      // Modal Content 

   
      const titleElement = document.createElement('h5');
      titleElement.classList.add('modal-title', 'text-capitalize')
      titleElement.innerText = pokemon.name;
      
      const imageElement = document.createElement('img');
      imageElement.classList.add('img-thumbnail');
      imageElement.src = pokemon.imageURL;

      const typesElement = document.createElement('ul');
  
      const heightElement = document.createElement('li');
      heightElement.innerText = `Height: ${pokemon.height}`;
      typesElement.append(heightElement);

      for (const type of pokemon.types) {
        const typeElement = document.createElement('li')
        typeElement.innerText = `Type: ${type.type.name}`;
        typesElement.appendChild(typeElement);
       
      }
     
      modalHeader.prepend(titleElement);
      contentBody.appendChild(imageElement);
      contentBody.appendChild(typesElement);
      
    });

    // MODAL ENDS // 

    // Closing MODAL // 
  }

  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    addListItem: addListItem,
  };
})(); // makes methods accessible outside of IIFE

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});


