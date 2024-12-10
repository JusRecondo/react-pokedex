import useSearch from "../hooks/useSearch"

const Header = () => {
  const { handleChange, handleSubmit, search } = useSearch()

  return (
    <header id="main-header">
        <h1>Pokemon</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="search" 
            id="search" 
            value={search} 
            onChange={handleChange} 
            placeholder="Search for a Pokemon"
            aria-label="Search for a Pokemon"
          />
        </form>
    </header>
  )
}

export default Header