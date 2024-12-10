import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router"
import { fetchPokemonsWithImg, getSearchStatus, selectNextUrl } from "../redux/features/pokemonsSlice"
import { SEARCH_STATUS } from "../lib/const"
import Button from "./Button"

const PokemonsList = ({ pokemons = [] }) => {
  const dispatch = useDispatch()
  const nextUrl = useSelector(selectNextUrl)
  const searchStatus = useSelector(getSearchStatus)
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
        (searchStatus === SEARCH_STATUS.IDLE && nextUrl) && (
          <Button
            handleClick={handleLoadMorePokemons}
            handleKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleLoadMorePokemons()
              }
            }}
          >
            Load more Pokemons
          </Button>
        ) 
      }
    </>
  )
}

export default PokemonsList