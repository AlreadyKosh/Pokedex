const pokeApi = {};
const genero = {};
const genderClass = document.getElementById("masculino");

async function convertPokeApiDetailPokemons(pokeDetail) {
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

async function convertPokemonsSpecies(pokeSpecies) {
    const pokemon = new PokemonSpecie();
    pokemon.species = pokeSpecies.genera[7].genus;

    const eggGroups = pokeSpecies.egg_groups.map((eggs) => eggs.name);
    pokemon.eggGroups = eggGroups;

    const gender = pokeSpecies.gender_rate;

    genero.pegaGenero = (genero) => {
        if (genero == "masculino") {
            if (gender == 1) {
                pokemon.gender = "87,5%";
            } else if (gender == 2) {
                pokemon.gender = "75,0%";
            } else if (gender == 4) {
                pokemon.gender = "50,0%";
            } else if (gender == 5) {
                pokemon.gender = "0,0%";
            } else if (gender == 6) {
                pokemon.gender = "25,0%";
            } else if (gender == 8) {
                pokemon.gender = "0,0%";
            } else if (gender == 0) {
                pokemon.gender = "100,0%";
            }
        } else {
            if (gender == 1) {
                pokemon.gender = "12,5%";
            } else if (gender == 2) {
                pokemon.gender = "25,0%";
            } else if (gender == 4) {
                pokemon.gender = "50,0%";
            } else if (gender == 5) {
                pokemon.gender = "100,0%";
            } else if (gender == 6) {
                pokemon.gender = "75,0%";
            } else if (gender == 8) {
                pokemon.gender = "100,0%";
            } else if (gender == 0) {
                pokemon.gender = "0,0%";
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

pokeApi.getPokemons = (offset = 0, limit = 5) => {
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
