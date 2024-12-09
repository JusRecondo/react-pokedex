import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import Header from "./components/Header"
import PokemonDetail from "./components/PokemonDetail"


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
      </Routes>
    </>
  )
}

export default App
