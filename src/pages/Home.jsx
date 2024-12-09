import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPokemonsWithImg, getPokemonsError, getPokemonsLoading, selectAllPokemonsWithImg } from "../redux/features/pokemonsSlice"
import PokemonsList from "../components/PokemonList"

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
          <PokemonsList pokemons={pokemons} />
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