import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL, DEFAULT_URL, SEARCH_STATUS } from '../../lib/const'

const initialState = {
    pokemonsWithImg: [],
    pokemonsList: [],
    filteredPokemons: [],
    loading: false,
    error: null,
    nextUrl: '',
    searchStatus: SEARCH_STATUS.IDLE,
}

export const fetchPokemonsList = createAsyncThunk(
    'pokemons/fetchPokemonsList',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(
                API_URL + 'pokemon?limit=1500&offset=0'
            )
            const results = response.data.results
            return results
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                'Unknown error'
            console.error(message)
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const fetchPokemonsWithImg = createAsyncThunk(
    'pokemons/fetchPokemonsWithImg',
    async (url = DEFAULT_URL, thunkAPI) => {
        try {
            const response = await axios.get(url)
            const results = response.data.results
            const next = response.data.next
            const pokemonsWithData = await Promise.all(
                results.map(async pokemon => {
                    const pokemonData = await axios.get(pokemon.url)
                    return {
                        id: pokemonData.data.id,
                        name: pokemonData.data.name,
                        img: pokemonData.data.sprites.other.dream_world
                            .front_default,
                        url: pokemon.url,
                    }
                })
            )
            return {
                pokemons: pokemonsWithData,
                next,
            }
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                'Unknown error'
            console.error(message)
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const fetchSearchedPokemonsWithImg = createAsyncThunk(
    'pokemons/fetchSearchedPokemonsWithImg',
    async (search, thunkAPI) => {
        try {
            const state = thunkAPI.getState()
            const filteredPokemons = state.pokemons.pokemonsList.filter(
                pokemon => pokemon.name.includes(search.toLowerCase())
            )
            if (filteredPokemons.length === 0) {
                throw new Error('No pokemons found for this search')
            }
            console.log(filteredPokemons)
            const pokemonsWithData = await Promise.all(
                filteredPokemons.map(async pokemon => {
                    const pokemonData = await axios.get(pokemon.url)
                    return {
                        id: pokemonData.data.id,
                        name: pokemonData.data.name,
                        img: pokemonData.data.sprites.other.dream_world
                            .front_default,
                        url: pokemon.url,
                    }
                })
            )
            return {
                pokemons: pokemonsWithData,
            }
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                'Unknown error'
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const pokemonsSlice = createSlice({
    name: 'pokemons',
    initialState,
    reducers: {
        resetPokemons: state => {
            state.filteredPokemons = []
            state.searchStatus = SEARCH_STATUS.IDLE
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchPokemonsList.pending, state => {
            state.loading = true
            state.error = false
        })
        builder.addCase(fetchPokemonsList.fulfilled, (state, action) => {
            state.loading = false
            state.pokemonsList = action.payload
        })
        builder.addCase(fetchPokemonsList.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(fetchPokemonsWithImg.pending, state => {
            state.loading = true
            state.error = null
        })
        builder.addCase(fetchPokemonsWithImg.fulfilled, (state, action) => {
            state.loading = false
            state.pokemonsWithImg = state.pokemonsWithImg.concat(
                action.payload.pokemons
            )
            state.nextUrl = action.payload.next
        })
        builder.addCase(fetchPokemonsWithImg.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(fetchSearchedPokemonsWithImg.pending, state => {
            state.loading = true
            state.error = null
            state.searchStatus = SEARCH_STATUS.LOADING
        })
        builder.addCase(
            fetchSearchedPokemonsWithImg.fulfilled,
            (state, action) => {
                state.loading = false
                state.searchStatus = SEARCH_STATUS.SUCCESS
                state.filteredPokemons = action.payload.pokemons
            }
        )
        builder.addCase(
            fetchSearchedPokemonsWithImg.rejected,
            (state, action) => {
                state.loading = false
                state.searchStatus = SEARCH_STATUS.FAILED
                state.error = action.payload
            }
        )
    },
})

export const selectAllPokemonsWithImg = state => state.pokemons.pokemonsWithImg
export const selectPokemonsList = state => state.pokemons.pokemonsList
export const selectFilteredPokemons = state => state.pokemons.filteredPokemons
export const selectNextUrl = state => state.pokemons.nextUrl
export const getPokemonsLoading = state => state.pokemons.loading
export const getPokemonsError = state => state.pokemons.error
export const getSearchStatus = state => state.pokemons.searchStatus

export const { resetPokemons } = pokemonsSlice.actions

export default pokemonsSlice.reducer
