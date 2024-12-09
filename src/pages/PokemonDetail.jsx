import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { fetchPokemonById, getPokemonLoading, selectPokemon } from "../redux/features/pokemonSlice"
import Loader from "../components/Loader"
import { BiArrowBack } from "react-icons/bi"

const PokemonDetail = () => {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const pokemonDetails = useSelector(selectPokemon)
  const loading = useSelector(getPokemonLoading)

  useEffect(() => {
    dispatch(fetchPokemonById(params.id))
  }, [])

  return (
    <main id="pokemon-detail">
      {
        loading && (
          <Loader fullPage />
        )
      }
      <button onClick={() => navigate(-1)} className="go-back" aria-label="go back to home page">
        <BiArrowBack />
      </button>
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
    </main>
  )
}

export default PokemonDetail