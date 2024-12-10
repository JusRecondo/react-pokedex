import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPokemonsWithImg, getPokemonsError, getPokemonsLoading, selectAllPokemonsWithImg } from "../redux/features/pokemonsSlice"
import PokemonsList from "../components/PokemonList"
import Loader from "../components/Loader"
import ErrorMessage from "../components/ErrorMessage"

const Home = () => {
  const [fullPageLoader, setFullPageLoader] = useState(true)
  const dispatch = useDispatch()
  const pokemons = useSelector(selectAllPokemonsWithImg)
  const loading = useSelector(getPokemonsLoading)
  const error = useSelector(getPokemonsError)

  useEffect(() => {
    if (pokemons.length === 0) {
      dispatch(fetchPokemonsWithImg())
    }
  }, [])

  useEffect(() => {
    if (pokemons.length > 0 ) {
      setFullPageLoader(false)
    }
  }, [pokemons])

  return (
    <main id="home">
      {
        pokemons.length > 0 && (
          <PokemonsList pokemons={pokemons} />
        )
      }
      {
        loading && (
          <Loader fullPage={fullPageLoader} />
        )
      }
      {
        error && (
          <ErrorMessage />
        )
      }
    </main>
  )
}

export default Home