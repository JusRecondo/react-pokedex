import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useDebounce from "./useDebounce";
import { fetchPokemonsList, fetchSearchedPokemonsWithImg, resetPokemons } from "../redux/features/pokemonsSlice";

const useSearch = () => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300)

  useEffect(() => {
    dispatch(fetchPokemonsList())
  }, [])

  useEffect(() => {
    if (debouncedSearch !== '') {
      dispatch(fetchSearchedPokemonsWithImg(debouncedSearch))
    } else {
      dispatch(resetPokemons());
    }
  }, [debouncedSearch]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (search !== '') {
      dispatch(fetchSearchedPokemonsWithImg(search))
    } else {
      dispatch(resetPokemons())
    }
  }

  return {
    handleChange,
    handleSubmit,
    search
  }
}

export default useSearch