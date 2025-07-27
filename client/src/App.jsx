import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import NotFound from './components/notFound/NotFound'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
