import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPokemonsWithImg, getPokemonsError, getPokemonsLoading, selectAllPokemonsWithImg } from "../redux/features/pokemonsSlice"

const Home = () => {
  const dispatch = useDispatch()
  const pokemons = useSelector(selectAllPokemonsWithImg)
  const loading = useSelector(getPokemonsLoading)
  const error = useSelector(getPokemonsError)

  useEffect(() => {
    dispatch(fetchPokemonsWithImg())
  }, [])

  return (
    <main id="home">
      {
        pokemons.length > 0 && (
          <ul>
            {pokemons?.map(pokemon => (
              <li key={pokemon.id}>
                <img src={pokemon.img} alt={pokemon.name} />
                <p>{pokemon.name}</p>
              </li>
            ))}
          </ul>
        )
      }
      {
        loading && (
          <p>Loading...</p>
        )
      }
      {
        error && (
          <p>Ups! Something went wrong...</p>
        )
      }
    </main>
  )
}

export default Home