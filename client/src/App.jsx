import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ComingSoon from './components/comingSoon/ComingSoon'
import Home from './components/home/Home'
import NotFound from './components/notFound/NotFound'
import { Analytics } from "@vercel/analytics/next"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<ComingSoon />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
