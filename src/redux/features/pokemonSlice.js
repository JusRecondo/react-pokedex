import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '../../lib/const'

const initialState = {
  pokemonDetails: {},
  loading: false,
  error: null,
}

export const fetchPokemonById = createAsyncThunk(
  'pokemon/fetchPokemonById',
  async (pokemonId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}pokemon/${pokemonId}`)
      const data = response.data 
      return { 
        name: data.species.name,
        img: data.sprites.other.dream_world.front_default,
        types: data.types.map(e => e.type.name).join(', '),
        abilities: data.abilities.map(e => e.ability.name).join(', '),
        stats: data.stats.map(stat => ({
          name: stat.stat.name,
          value: stat.base_stat
        }))
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Unknown error'
      console.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonById.pending, (state) => {
      state.loading = true
      state.error = null
      state.pokemonDetails = {}
    })
    builder.addCase(fetchPokemonById.fulfilled, (state, action) => {
      state.loading = false
      state.pokemonDetails = action.payload
    })
    builder.addCase(fetchPokemonById.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.pokemonDetails = {}
    })
  }
})

export const selectPokemon = state => state.pokemon.pokemonDetails
export const getPokemonLoading = (state) => state.pokemon.loading
export const getPokemonError = (state) => state.pokemon.error

export default pokemonSlice.reducer