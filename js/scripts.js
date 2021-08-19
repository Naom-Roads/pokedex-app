// Iterates through list and checks to see if height is greater than 5
// Displays the name and height 

const pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit#=60';

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
      const modalContainer = document.querySelector('#modal-container');
   

      // Clears Existing Modal 

      modalContainer.innerHTML = '';

      const modal = document.createElement('div');
      modal.classList.add('modal');

      const contentElement = document.createElement('div');
      contentElement.classList.add('content')
      
      // Adds new Modal Content 
      const closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'X';
      closeButtonElement.addEventListener('click', hideModal);


      // Modal Content 

      const titleElement = document.createElement('h1');
      titleElement.innerText = pokemon.name;
      
      
      const imageElement = document.createElement('img');
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


      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(imageElement);
      contentElement.appendChild(typesElement);
      modal.appendChild(contentElement);
      modalContainer.appendChild(modal);


      modalContainer.classList.add('is-visible');
     
    })

    // Hides Container 

    let dialogPromiseReject;
    let modalContainer = document.querySelector('#modal-container');

    function hideModal() {
      modalContainer.classList.remove('is-visible');

      if (dialogPromiseReject) {
        dialogPromiseReject();
        dialogPromiseReject = null;
      }
    }

    // MODAL ENDS // 

    // Closing MODAL // 

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });

    modalContainer.addEventListener('click', (e) => {
      // This is also triggered when clickin inside the Modal 
      //We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
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






// TEMPLATE Modal JS 


// function showModal(pokemon) {
//   let modalContainer = document.querySelector('#modal-container');

//   //Clear Existing Modal Content 
//   modalContainer.innerHTML = '';

//   let modal = document.createElement('div');
//   modal.classList.add('modal');


//   // Add the new Modal Content 
//   let closeButtonElement = document.createElement('button');
//   closeButtonElement.classList.add('modal-close');
//   closeButtonElement.innerText = 'Close';
//   closeButtonElement.addEventListener('click', hideModal);


//   let titleElement = document.createElement('h1');
//   titleElement.innerText = pokemon.name;

//   let contentElement = document.createElement('p');
//   contentElement.innerText = showDetails(pokemon);


//   modal.appendChild(closeButtonElement);
//   modal.appendChild(titleElement);
//   modal.appendChild(contentElement);
//   modalContainer.appendChild(modal);

//   modalContainer.classList.add('is-visible');
// }


// let dialogPromiseReject;
// let modalContainer = document.querySelector('#modal-container');

// function hideModal() {
//   modalContainer.classList.remove('is-visible');

//   if (dialogPromiseReject) {
//     dialogPromiseReject();
//     dialogPromiseReject = null
//   }
// }

// function showDialog(title, text) {
//   showModal(title, text);


//   // Confirm and cancel buttons  
//   let modal = modalContainer.querySelector('.modal');

//   let confirmButton = document.createElement('button');
//   confirmButton.classList.add('modal-confirm');
//   confirmButton.innerText = 'Confirm';

//   let cancelButton = document.createElement('button')
//   cancelButton.classList.add('modal-cancel');
//   cancelButton.innerText = 'Cancel';

//   modal.appendChild(confirmButton);
//   modal.appendChild(cancelButton);


//   // This allows the user to press enter to confirm 
//   confirmButton.focus();
//   return new Promise((resolve, reject) => {
//     cancelButton.addEventListener('click', hideModal);
//     confirmButton.addEventListener('click', () => {
//       dialogPromiseReject = null; // Reset this
//       hideModal();
//       resolve();
//     });
//     // This can be used to reject from other functions
//     dialogPromiseReject = reject;
//   });
// }


// document.querySelector('#show-dialog').addEventListener('click', () => {
//   showDialog('Confirm action', 'Are you sure you want to do this?').then(function () {
//     alert('confirmed!');
//   }, () => {
//     alert('not confirmed');
//   });
// });

// window.addEventListener('keydown', (e) => {
//   if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
//     hideModal();
//   }
// });

// modalContainer.addEventListener('click', (e) => {
//   // This is also triggered when clickin inside the Modal 
//   //We only want to close if the user clicks directly on the overlay
//   let target = e.target;
//   if (target === modalContainer) {
//     hideModal();
//   }
// });

// document.querySelector('#show-modal').addEventListener('click',
//   () => {
//     showModal('Modal Title', 'This is the modal content!');
//   });