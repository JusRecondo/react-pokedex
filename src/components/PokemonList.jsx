import { Link } from "react-router"

const PokemonsList = ({ pokemons = [] }) => {
  return (
    <>
      <ul className="pokemons-list">
        {
          pokemons?.map((pokemon) => (
            <li 
              key={pokemon.id} 
              className="pokemon-item"
            >
              <Link to={`pokemon/${pokemon.id}`}>
                <img 
                  src={pokemon.img ? pokemon.img : '/pokeball.svg'} 
                  alt={pokemon.name} 
                />
                {pokemon.name}
              </Link>
            </li>
          ))
        }
      </ul>
    </>
  )
}

export default PokemonsList