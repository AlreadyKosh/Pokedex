const pokeApi = {};
const genero = {};

function convertPokeApiDetailPokemons(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;

    const abilities = pokeDetail.abilities.map(
        (ability) => ability.ability.name
    );

    const [ability] = abilities;

    pokemon.abilities = abilities;
    pokemon.ability = ability;

    return pokemon;
}

function convertPokemonsSpecies(pokeSpecies) {
    const pokemon = new PokemonSpecie();
    pokemon.species = pokeSpecies.genera[7].genus;

    const eggGroups = pokeSpecies.egg_groups.map((eggs) => eggs.name);
    pokemon.eggGroups = eggGroups;

    const gender = pokeSpecies.gender_rate;

    genero.pegaGenero = (generoM, generoF) => {
        let variavelG;
        if (gender == -1) {
            pokemon.agenero = `<span>Genero Desconhecido</span>`;
        } else {
            if (generoM == "masculino") {
                if (gender == 1) {
                    variavelG = "87,5%";
                } else if (gender == 2) {
                    variavelG = "75,0%";
                } else if (gender == 4) {
                    variavelG = "50,0%";
                } else if (gender == 5) {
                    variavelG = "0,0%";
                } else if (gender == 6) {
                    variavelG = "25,0%";
                } else if (gender == 8) {
                    variavelG = "0,0%";
                } else if (gender == 0) {
                    variavelG = "100,0%";
                }
                pokemon.gender = `<span class="masculino"><i class="fa-solid fa-mars-stroke icone"></i>${variavelG}</span>`;
            }
            if ((generoF = "feminino")) {
                if (gender == 1) {
                    variavelG = "12,5%";
                } else if (gender == 2) {
                    variavelG = "25,0%";
                } else if (gender == 4) {
                    variavelG = "50,0%";
                } else if (gender == 5) {
                    variavelG = "100,0%";
                } else if (gender == 6) {
                    variavelG = "75,0%";
                } else if (gender == 8) {
                    variavelG = "100,0%";
                } else if (gender == 0) {
                    variavelG = "0,0%";
                }
                pokemon.gender += `<span class="feminino"><i class="fa-solid fa-venus icone"></i>${variavelG}</span>`;
            }
        }
    };

    return pokemon;
}

pokeApi.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailPokemons);
};

pokeApi.getPokemons = (offset = 0, limit = 8) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
        .then((detailsRequests) => Promise.all(detailsRequests))
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((error) => console.error(error));
};

pokeApi.getPokemonDetail = (pokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailPokemons);
};

pokeApi.getPokemonSpecie = (pokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`;

    return fetch(url)
        .then((response) => response.json())
        .then(convertPokemonsSpecies);
};
