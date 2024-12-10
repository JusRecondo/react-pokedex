import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { fetchPokemonById, getPokemonError, getPokemonLoading, resetPokemon, selectPokemon } from "../redux/features/pokemonSlice"
import Loader from "../components/Loader"
import ErrorMessage from "../components/ErrorMessage"
import Button from "../components/Button"
import { BiArrowBack } from "react-icons/bi"

const PokemonDetail = () => {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const pokemonDetails = useSelector(selectPokemon)
  const loading = useSelector(getPokemonLoading)
  const error = useSelector(getPokemonError)

  useEffect(() => {
    dispatch(resetPokemon())
    dispatch(fetchPokemonById(params.id))
  }, [])

  return (
    <main id="pokemon-detail">
      {
        loading && (
          <Loader fullPage />
        )
      }
      <Button
        handleClick={() => navigate(-1)}
        ariaLabel="go back to home page"
        customClassName="go-back"
      >
        <BiArrowBack />
      </Button>
      {
        pokemonDetails.name && (
          <section>
            <div className="section-inner">
              <header>
                <h2>{pokemonDetails?.name}</h2>
                <p>
                  <strong>Types:</strong> {pokemonDetails?.types}
                </p>
              </header>
              <img
                src={pokemonDetails.img ? pokemonDetails.img : '/pokeball.svg'}
                alt={pokemonDetails?.name}
              />
              <p><strong>Abilities:</strong> {pokemonDetails?.abilities}</p>
              <div className="pokemon-stats">
                <h3>Stats</h3>
                <ul>
                  {pokemonDetails?.stats?.map((stat, i) => (
                    <li key={i}>
                      <strong>{stat.name}:</strong> {stat.value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
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

export default PokemonDetail