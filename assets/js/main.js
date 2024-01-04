const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const loadDetailPokemon = document.querySelector(".pokemons");
let teste = 0;
const maxRecords = 151;
const limit = 20;
let offset = 0;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons
            .map(
                (pokemon) => `
            <a  href="#" onclick="loadPokemonDetail(${pokemon.number}) ">
                <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    <div class="detail">
                        <ol class="types">
                        ${pokemon.types
                            .map(
                                (type) =>
                                    `<li class="type ${type}">${type}</li>`
                            )
                            .join("")}
                        </ol>
                        <img
                            src="${pokemon.photo}"
                            alt="${pokemon.name}"
                        />
                    </div>
                </li>
            </a>
            `
            )
            .join("");

        pokemonList.innerHTML += newHtml;
    });
}

const pokemonDetail = document.getElementById("pokemon-detalhes");
const pokedex = document.getElementById("pokedex");

function loadPokemonDetail(pokemon) {
    pokeApi.getPokemonDetail(pokemon).then((response) => {
        pokeApi.getPokemonSpecie(pokemon).then((species) => {
            if (!pokedex.hasAttribute("hidden")) {
                pokedex.setAttribute("hidden", "true");
                pokemonDetail.removeAttribute("hidden");

                pokemonDetail.innerHTML = `
            <section id="pokemon-detalhes" class="${response.type}">
            <section class="pokemon-top">
                <header class="header-detalhes">
                    <a href="index.html"
                        ><i class="fa-solid fa-arrow-left"></i
                    ></a>
                    <i class="fa-regular fa-heart"></i>
                </header>
                <span class="name-detalhes">${response.name}</span>
                <span class="number-detalhes">#${response.number}</span>
                <ol class="types-detalhes">
                ${
                    response.types
                        ? response.types
                              .map(
                                  (type) =>
                                      `<li class="type-detalhe ${type}">${type}</li>`
                              )
                              .join("")
                        : null
                }
                </ol>
                <img
                    src="${response.photo}"
                    alt=""
                    class="img-pokemon"
                />
            </section>
            <section class="infos">
                <nav>
                    <ul class="menu">
                        <li class="active">About</li>
                        <li>Base Stats</li>
                        <li>Evolution</li>
                        <li>Movies</li>
                    </ul>
                </nav>
    
                <table>
                    <tr>
                        <td class="title">Species</td>
                        <td class="item">${species.species}</td>
                    </tr>
                    <tr>
                        <td class="title">Heigh</td>
                        <td class="item">${response.height / 10} m</td>
                    </tr>
                    <tr>
                        <td class="title">Weight</td>
                        <td class="item">${response.weight / 10} Kg</td>
                    </tr>
                    <tr>
                        <td class="title">Abilities</td>
                        <td class="item">${
                            response.abilities
                                ? response.abilities
                                      .map((ability) => ability)
                                      .join(", ")
                                : null
                        }</td>
                    </tr>
                    <th>Breeding</th>
                    <tr>
                        <td class="title">Gender</td>
                        <td  class="item genero">
                            ${
                                (genero.pegaGenero("masculino", "feminino"),
                                species.agenero
                                    ? species.agenero
                                    : species.gender)
                            }
                               
                            
                        </td>
                    </tr>
                    <tr>
                        <td class="title">Egg Groups</td>
                        <td class="item">${
                            species.eggGroups
                                ? species.eggGroups
                                      .map((eggs) => eggs)
                                      .join(", ")
                                : null
                        }</td>
                    </tr>
                </table>
            </section>
        </section>
            `;
            }
        });
    });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit;
    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});

loadDetailPokemon.addEventListener("click", () => {
    loadDetailPokemon.classList.add("display-none");
});
