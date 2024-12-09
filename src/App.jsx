import { Route, Routes } from "react-router"
import Home from "./pages/Home"


function App() {
  return (
    <>
      <h1>Pokemon</h1>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
