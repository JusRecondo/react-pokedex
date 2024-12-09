import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'
import { DEFAULT_URL } from '../../lib/const'

const initialState = {
  pokemonsWithImg: [],
  loading: false,
  error: null
}

export const fetchPokemonsWithImg = createAsyncThunk(
  'pokemons/fetchPokemonsWithImg',
  async (url = DEFAULT_URL, thunkAPI) => {
    try {
      const response = await axios.get(url)
      const results = response.data.results
      const pokemonsWithData = await Promise.all(
        results.map(async (pokemon) => {
          const pokemonData = await axios.get(pokemon.url)
          return {
            id: pokemonData.data.id,
            name: pokemonData.data.name,
            img: pokemonData.data.sprites.other.dream_world.front_default,
            url: pokemon.url
          }
        })
      )
      return {
        pokemons: pokemonsWithData,
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Unknown error'
      console.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonsWithImg.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchPokemonsWithImg.fulfilled, (state, action) => {
      state.loading = false
      state.pokemonsWithImg = action.payload.pokemons
    })
    builder.addCase(fetchPokemonsWithImg.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  }
})

export const selectAllPokemonsWithImg = (state) => state.pokemons.pokemonsWithImg
export const getPokemonsLoading = (state) => state.pokemons.loading
export const getPokemonsError = (state) => state.pokemons.error

export default pokemonsSlice.reducer


