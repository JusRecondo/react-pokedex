import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router"
import { fetchPokemonsWithImg, selectNextUrl } from "../redux/features/pokemonsSlice"

const PokemonsList = ({ pokemons = [] }) => {
  const dispatch = useDispatch()
  const nextUrl = useSelector(selectNextUrl)
  const handleLoadMorePokemons = () => {
    dispatch(fetchPokemonsWithImg(nextUrl))
  }
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
                <p>
                  {pokemon.name}
                </p>
              </Link>
            </li>
          ))
        }
      </ul>
      {
        nextUrl && (
          <button 
            onClick={handleLoadMorePokemons}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleLoadMorePokemons()
              }
            }}
          >
            Load more Pokemons
          </button>
        ) 
      }
    </>
  )
}

export default PokemonsList