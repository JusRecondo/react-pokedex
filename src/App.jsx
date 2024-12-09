import { Route, Routes } from "react-router"
import Header from "./components/Header"
import Home from "./pages/Home"
import PokemonDetail from "./pages/PokemonDetail"


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
