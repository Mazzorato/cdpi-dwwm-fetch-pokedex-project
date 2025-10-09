function main() {
    // Je récupère les 151 premiers pokémons
    fetch("https://pokebuildapi.fr/api/v1/pokemon/limit/151")
        .then(res => res.json())
        .then((pokemons_arr) => {
            const pokemonListelem = document.querySelector(".pokemon-list");
            pokemons_arr.forEach(pokemon_obj => {
                const template_pokemon = document.getElementById("template-pokemon");
                const pokemon_elem = template_pokemon.content.cloneNode(true);

                // Infos
                pokemon_elem.querySelector(".name").innerText = pokemon_obj.name;
                pokemon_elem.querySelector(".id").innerText = pokemon_obj.id;
                pokemon_elem.querySelector(".pokemon-image").setAttribute("src", pokemon_obj.image);

                // Clic → afficher détails
                const pokemonItemDiv = pokemon_elem.querySelector(".pokemon-item");
                pokemon_elem.firstElementChild;
                pokemonItemDiv.addEventListener("click", () => {
                    showPokemonDetail(pokemon_obj);
                });

                // Ajout à la liste
                document.querySelector(".pokemon-list").appendChild(pokemon_elem);
            });
        });

    // Formulaire recherche
    const form = document.querySelector(".form_pokemon");
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const input = form.querySelector('input[name="pokemon_name"]');
        const name = input.value.trim();
        if (!name) return;

        fetch(`https://pokebuildapi.fr/api/v1/pokemon/${name}`)
            .then(res => res.json())
            .then((pokemon_obj) => {
                showPokemonDetail(pokemon_obj);
            });
    });
}

// Affichage détail
function showPokemonDetail(pokemon_obj) {
    const template_detail = document.getElementById("template-detail");
    const detail_elem = template_detail.content.cloneNode(true);

    // Infos de base
    detail_elem.querySelector(".detail-name").innerText = pokemon_obj.name;
    detail_elem.querySelector(".detail-id").innerText = `N°${pokemon_obj.id}`;
    detail_elem.querySelector(".pokemon-image-detail").setAttribute("src", pokemon_obj.image);
    detail_elem.querySelector(".detail-type").innerText = pokemon_obj.type;
    
    //Types de pokémon
    const type_elem = detail_elem.querySelector(".detail-type");
    type_elem.innerHTML = "";

    pokemon_obj.apiTypes.forEach(type => {
        const img = document.createElement("img");
        img.setAttribute("src", type.image);
        img.setAttribute("alt", type.name);
        img.classList.add("type-logo");
        type_elem.appendChild(img);
    });
    // Évolutions
    const evolutions_elem = detail_elem.querySelector(".evolutions");
    evolutions_elem.innerHTML = "";

    if (pokemon_obj.apiEvolutions && pokemon_obj.apiEvolutions.length > 0) {
        pokemon_obj.apiEvolutions.forEach(evo => {
            fetch(`https://pokebuildapi.fr/api/v1/pokemon/${evo.pokedexId}`)
                .then(res => res.json())
                .then(evo_obj => {
                    const template_pokemon = document.getElementById("template-pokemon");
                    const evo_elem = template_pokemon.content.cloneNode(true);

                    evo_elem.querySelector(".name").innerText = evo_obj.name;
                    evo_elem.querySelector(".id").innerText = evo_obj.id;
                    evo_elem.querySelector(".pokemon-image").setAttribute("src", evo_obj.image);

                    evolutions_elem.appendChild(evo_elem);
                });
        });
    } else {
        evolutions_elem.innerText = "Pas d'évolution";
    }

    // Injection dans le container
    const detailContainer = document.querySelector(".pokemon-detail-container");
    detailContainer.innerHTML = "";
    detailContainer.appendChild(detail_elem);
}

main();
