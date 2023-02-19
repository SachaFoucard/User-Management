import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UsersContextProvider from './Context/UsersContext'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Profil from './Pages/Profil'
import Director from './Pages/Director'

function App() {


  return (
    <>
      <UsersContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/profil/:email" element={<Profil/>} />
            <Route path="/directorProfil/:email" element={<Director/>} />
          </Routes>
        </BrowserRouter>
      </UsersContextProvider>
    </>
  )
}

export default App
