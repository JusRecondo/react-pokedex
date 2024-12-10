import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPokemonsWithImg, getPokemonsError, getPokemonsLoading, getSearchStatus, resetPokemons, selectAllPokemonsWithImg, selectFilteredPokemons } from "../redux/features/pokemonsSlice"
import PokemonsList from "../components/PokemonList"
import Loader from "../components/Loader"
import ErrorMessage from "../components/ErrorMessage"
import { SEARCH_STATUS } from "../lib/const"

const Home = () => {
  const [fullPageLoader, setFullPageLoader] = useState(true)
  const dispatch = useDispatch()
  const pokemons = useSelector(selectAllPokemonsWithImg)
  const filteredPokemons = useSelector(selectFilteredPokemons)
  const searchStatus = useSelector(getSearchStatus)
  const loading = useSelector(getPokemonsLoading)
  const error = useSelector(getPokemonsError)

  useEffect(() => {
    dispatch(resetPokemons())
    if (pokemons.length === 0) {
      dispatch(fetchPokemonsWithImg())
    }
  }, [])

  useEffect(() => {
    if (pokemons.length > 0 ) {
      setFullPageLoader(false)
    }
  }, [pokemons])

  const pokemonsToDisplay = (filteredPokemons.length > 0 &&
    searchStatus !== SEARCH_STATUS.IDLE)
    ? filteredPokemons : pokemons

  return (
    <main id="home">
      {
        searchStatus === SEARCH_STATUS.FAILED ? (
          <ErrorMessage message={error} />
        ) : (
          <>
            {
              pokemonsToDisplay.length > 0 && (
                <PokemonsList pokemons={pokemonsToDisplay} />
              )
            }
            {
              loading && (
                <Loader fullPage={fullPageLoader} />
              )
            }
            {
              error && (
                <ErrorMessage message={error} />
              )
            }
          </>
        )
      }
    </main>
  )
}

export default Home