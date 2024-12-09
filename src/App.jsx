import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPokemonsWithImg, getPokemonsLoading, selectAllPokemonsWithImg } from "./redux/features/pokemonsSlice"


function App() {
  const dispatch = useDispatch()
  const pokemons = useSelector(selectAllPokemonsWithImg)
  const loading = useSelector(getPokemonsLoading)
  useEffect(() => {
    dispatch(fetchPokemonsWithImg())
  }, [])
  
  return (
    <>
      <h1>Pokemon</h1>
      {
        loading ? (
          <p>Loading...</p>
        ) : (
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
    </>
  )
}

export default App
