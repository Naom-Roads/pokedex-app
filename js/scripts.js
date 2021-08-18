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

// Email Validation with Error Handling

(function () {
    let form = document.querySelector('#register-form');
    let emailInput = document.querySelector('#email');
    let passwordInput = document.querySelector('#password');

    function showErrorMessage(input, message) {
      let container = input.parentElement; // The .input-wrapper

      //Removes existing error 
      let error = container.querySelector('.error-message');
      if (error) {
        container.removeChild(error); 
     }

     // Adds error if message is not empty
     if (message) {
       let error = document.createElement('div');
      error.classList.add('error-message');
      error.innerText = message;
      container.appendChild(error);
    }
  }

    function validateEmail() {
      let value = emailInput.value;

    if (!value) {
      showErrorMessage(emailInput, 'Email is a required field.');
      return false;
    }

    if (value.indexOf('@') === -1) {
      showErrorMessage(emailInput, 'You must enter a valid email address.');
      return false;
    }

    showErrorMessage(emailInput, null); 
      return true;
    }

    function validatePassword() {
      let value = passwordInput.value;

    if (!value) {
      showErrorMessage(passwordInput, 'Password is a required field.');
      return false;
    }

    if (value.length < 8) {
        showErrorMessage(passwordInput, 'The password needs to be at least 8 characters long.');
        return false;
      }

      showErrorMessage(passwordInput, null); 
        return true;
      }

      function validateForm() {
        let isValidEmail = validateEmail();
        let isValidPassword = validatePassword();
        return isValidEmail() && isValidPassword();
      }


      form.addEventListener('submit', (e) => {
        e.preventDefault(); // DO not submit to server
        if (validateForm()) {
          alert('Success!');
        }
      }); 

      emailInput.addEventListener('input', validateEmail); 
      passwordInput.addEventListener('input', validatePassword);
    })();
    

       
  