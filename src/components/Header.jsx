import { Link } from "react-router"
import useSearch from "../hooks/useSearch"

const Header = () => {
  const { handleChange, handleSubmit, search } = useSearch()

  return (
    <header id="main-header">
      <Link to="/">
        <h1>Pokemon</h1>
      </Link>
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