const nomePokemon = document.querySelector('.nome-pokemon');
const idPokemon = document.querySelector('.id-pokemon');
const imagemPokemon = document.querySelector('.pokemon');
const form = document.querySelector('.form');
const input = document.querySelector('.input-search');
const prev = document.querySelector('.botao-prev');
const next = document.querySelector('.botao-next');
const audio = document.getElementById("audioPlayer");



let searchPokemon = 1;


const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    nomePokemon.innerHTML = 'Loading...';
    idPokemon.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data) { 
        imagemPokemon.style.display = 'block';
        nomePokemon.innerHTML = data.name;
        idPokemon.innerHTML = data.id;
        imagemPokemon.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else {
        imagemPokemon.style.display = 'none';
        nomePokemon.innerHTML = 'Not Found =(';
        idPokemon.innerHTML = ''; 
    }
} 

form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
    
});

prev.addEventListener('click', () => {
    if(searchPokemon > 1) { 
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    } 
});

next.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
    
});

// Referência ao elemento de áudio


// Reproduz o áudio automaticamente ao carregar a página
next.addEventListener('click', function() { 
audio.play()
audio.volume = 0.1;

});



renderPokemon(searchPokemon);