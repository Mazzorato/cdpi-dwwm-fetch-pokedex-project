function main() {
    fetch("https://pokebuildapi.fr/api/v1/pokemon/limit/100").then(res => res.json())
        .then((pokemons_arr) => {
            pokemons_arr.forEach(pokemon_obj => {
                //console.log(pokemon_obj)
                const template_pokemon = document.getElementById("template-pokemon");
                //clone template.
                const pokemon_elem = template_pokemon.content.cloneNode(true);
                //console.log(pokemon_elem)
                //Remplissage des infos
                pokemon_elem.querySelector(".name").innerText = pokemon_obj.name;
                pokemon_elem.querySelector(".id").innerText = pokemon_obj.id;
                pokemon_elem.querySelector(".pokemon-image").setAttribute("src", pokemon_obj.image);

                const pokemonList_elem = document.querySelector(".pokemon-list");
                pokemonList_elem.appendChild(pokemon_elem);
            })

        }
        )
}

main();