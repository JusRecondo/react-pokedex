import { configureStore } from "@reduxjs/toolkit"
import pokemonsReducer from './features/pokemonsSlice'
import pokemonReducer from './features/pokemonSlice'

export const store = configureStore({
  reducer: {
    pokemons: pokemonsReducer,
    pokemon: pokemonReducer,
  }
})