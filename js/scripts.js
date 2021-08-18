// Iterates through list and checks to see if height is greater than 5
// Displays the name and height 

const pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


  function showLoadingMessage() {
    let container = document.querySelector('.main');
    let loadmessage = document.createElement('div')
    loadmessage.id = "loading"
    loadmessage.innerText = "Loading..."
    loadmessage.classList.add('loading-class');
    loadmessage.classList.add('animate__animated', 'animate__flash');
    container.appendChild(loadmessage);
  } // creates loading and class to show loading message in loadList and loadDetails function

  function hideLoadingMessage() {
    document.getElementById('loading').style.display = 'none';
  } // clears the message once content is loaded 

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
    }).catch(console.log).finally(function () {
      hideLoadingMessage()
    });
  }

  function loadDetails(item) {
    showLoadingMessage()
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageURL = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(console.log).finally(function () {
      hideLoadingMessage()
    });
  }


  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    addListItem: addListItem,
    showLoadingMessage: showLoadingMessage
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// Modal JS 

function showModal(title, text) {
  let modalContainer = document.querySelector('#modal-container');

  //Clear Existing Modal Content 
  modalContainer.innerHTML = '';

  let modal = document.createElement('div');
  modal.classList.add('modal');


  // Add the new Modal Content 
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal); 
  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container'); 
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal(); 
    }
  })

  modalContainer.addEventListener('click', (e) => {
    // This is also triggered when clickin inside the Modal 
    //We only want to close if the user clicks directly on the overlay
    let target = e.target; 
    if (target === modalContainer) {
      hideModal();
    }
  }); 

  let titleElement = document.createElement('h1');
  titleElement.innerText = title;

  let contentElement = document.createElement('p');
  contentElement.innerText = text;


  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modalContainer.appendChild(modal);

  modalContainer.classList.add('is-visible');
}

document.querySelector('#show-modal').addEventListener('click',
  () => {
    showModal('Modal Title', 'This is the modal content!');
  });

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container'); 
    modalContainer.classList.remove('is-visible'); 
  } 