import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import MainPage from './routes/MainPage'
import LoginPage from './routes/LoginPage'
import SignUpPage from './routes/SignUpPage'
import VinilCreate from './routes/VinilCreate'
import VinilInfo from './routes/vynilInfo'
import MainAdminPage from './routes/MainAdmin'
import VynilEdit from './routes/EditVynil'

const App = () => {

  const [selectedVynil, setSelectedVynil] = useState([])
  const [likedVynils, setLikedVynils] = useState([])

  const viewVynil = (vinyl) => {
    setSelectedVynil(vinyl)
  }

  useEffect(() => {
    console.log(selectedVynil)
  }, [selectedVynil])

  useEffect(() => {
    
  }, [likedVynils])

  const handleFavorites = (favorites) => {
    setLikedVynils(favorites)
  }

  return (<Routes>
    <Route path="/" element={<LoginPage handleFavorites={handleFavorites}/>} />
    <Route path="/vynils" element={<MainPage viewVinil={viewVynil} />} />
    <Route path="/vynils-admin" element={<MainAdminPage />} />
    <Route path="/login" element={<LoginPage handleFavorites={handleFavorites} />} />
    <Route path="/sign-up" element={<SignUpPage />} />
    <Route path="/create" element={<VinilCreate />} />
    <Route path="/viewVynil" element={<VinilInfo selectedVynil={selectedVynil} likedVynils={likedVynils} setLikedVynils={setLikedVynils} />} />
    <Route path='/editVynil' element={<VynilEdit selectedVynil={selectedVynil} setSelectedVynil={setSelectedVynil} />} />
  </Routes>)
}

export default App
