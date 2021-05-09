// URL da Api --------------------------------------------
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

// Guardando os elementos --------------------------------------------
const searchInput = getElement('.search-input'),
    searchButton = getElement('.search-button'),
    container = getElement('.pokemon'),
    erroMessage = getElement('.error');

var pokeName, // Nome ou número passado na caixa de busca.
    pokemon, // Responsável por guardar os dados recebidos da API.
    card,  // Responsável por receber o HTML.
    errado;
// Construindo as Funções --------------------------------------------

// Função para reduzir a escrita na captura de elementos HTML
function getElement(element) {
    return document.querySelector(element);
}

//Função que vai adicionar um evento no botão de pesquisar
searchButton.addEventListener('click', event => {
    event.preventDefault();
    pokeName = searchInput.value.toLowerCase(); 
    /* A api só aceita nomes minusculos, então vamos usar a função toLowerCase para garantir que nenhuma letra maiuscula seja passada. */
    startApp(pokeName);
});

// Função responsável por fazer requisições para a API e inserir as respostas na variável pokemon.
function requestPokeInfo(url, name) {
    fetch(url + name)
    .then(response => response.json())
    .then(data => {
        pokemon = data;
    })
    .catch(err =>{ 
        errado = 'que doidera';
    });
}

// Função que faz a chamada das principais funções e inicia o app
function startApp(pokeName) {
    requestPokeInfo(baseUrl, pokeName);
    setTimeout(function () {
      //Exibe uma mensagem caso o pokemon pesquisado não exista
        if(errado == 'que doidera'){
            erroMessage.style.display = 'block';
            container.style.display = 'none';
        }else{
            erroMessage.style.display = 'none';
            container.style.display = 'flex';
            container.innerHTML = createCard();
        }
        
    }, 500); 
}

function createCard () {
    card = `
        <div class="card"  data-aos="fade-in">
            <div class="pokemon-picture">
                <img src="${pokemon.sprites.front_default}" alt="Sprite of ${pokemon.name}">
                <h1 style="text-transform: uppercase; font-size:1.2em">${pokemon.name}</h1>
            </div>
            <div class="pokemon-info">
                <h3 class="type"><span>Type: </span> ${pokemon.types.map(item => ' ' + item.type.name).toString()}</h3>
                <h3 class="skill"><span>Skills: </span> ${pokemon.moves.map(item => ' ' + item.move.name).toString()}</h3>
                <h3 class="weight"><span>Weight: </span> ${pokemon.weight  / 10}kg</h3>
                <h3 class="height"><span>Height: </span> ${pokemon.height  / 10}m</h3>
            </div>
        </div>`
;
    return card;
}