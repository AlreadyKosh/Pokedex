const pokeApi = {};

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
