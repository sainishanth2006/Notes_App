import React from 'react'
import { Route, Routes } from "react-router-dom"
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetail from './pages/NoteDetail'

const App = () => {
  return (
    <div className="relative min-h-screen overflow-hidden text-base-content" data-theme="forest">
      <div className="fixed inset-0 -z-10 [background:radial-gradient(125%_125%_at_50%_10%,#000_58%,#00FF9D33_100%)]" />
      
      <Routes>
        <Route path = "/" element = {<HomePage />} />
        <Route path = "/create" element = {<CreatePage/>}/>
        <Route path = "/note/:id" element = {<NoteDetail/>}/>
      </Routes>
    </div>
  )
}

export default App
