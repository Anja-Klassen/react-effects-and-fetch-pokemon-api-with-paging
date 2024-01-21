import { useEffect, useState } from "react";

const limit = 20; // damit wird die aktuelle Seitenzahl multipliziert

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [page, setPage] = useState(0); // wir benötigen state, der uns sagt auf welcher Seite wir sind; initial sind wir auf Seite 0

  useEffect(() => {
    async function loadPokemon() {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${
            limit * page
          }` //limit-Parameter kann hier mitgegeben werden mit template literal
        );
        const data = await response.json();
        setPokemon(data.results);
      } catch (error) {
        console.log(error);
      }
    }

    loadPokemon();
  }, [page]);

  return (
    <main>
      <button type="button" onClick={() => setPage(page === 0 ? 0 : page - 1)}>
        Previous Page
      </button>
      <button type="button" onClick={() => setPage(page + 1)}>
        Next Page
      </button>{" "}
      {/*Button so verändern, dass der Wert von setPage beim Klicken des Buttons sich um 1 erhöht; dazu nutzen wir den onClick Handler*/}
      <ul>
        {pokemon.map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </main>
  );
}
