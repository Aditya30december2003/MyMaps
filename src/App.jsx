import { useState } from 'react'
import './App.css'
import Signup from './components/signup'
import Home from './components/Home'
import Hero from './components/hero'
import { Route , Routes } from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/MyMaps' element={<Home />} />
      <Route path='/MyMaps/signup' element={<Signup />} />
      <Route path='/MyMaps/home' element={<Hero />} />
     </Routes>
      
    </>
  )
}

export default App
