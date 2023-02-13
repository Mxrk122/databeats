import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import MainPage from './routes/MainPage'
import LoginPage from './routes/LoginPage'
import SignUpPage from './routes/SignUpPage'
import VinilCreate from './routes/VinilCreate'
import VinilInfo from './routes/vynilInfo'
import VynilEdit from './routes/EditVynil'
import UserInfo from './routes/UserInfo'
import SectionPage from './routes/SectionPage'

const App = () => {

  const [selectedVynil, setSelectedVynil] = useState([])
  const [likedVynils, setLikedVynils] = useState([])
  const [isLikedVynil, setIsLikedVynil] = useState([])
  const [aggregation, setAggregation] = useState([])
  const [filter, setFilter] = useState("")

  const viewVynil = (vinyl) => {
    setSelectedVynil(vinyl)
  }

  useEffect(() => {
    console.log(aggregation)
  }, [aggregation])

  useEffect(() => {
    if (likedVynils.includes(selectedVynil._id)) {
      setIsLikedVynil(true)
    } else {
      setIsLikedVynil(false)
    }
  }, [selectedVynil])

  useEffect(() => {
  
    if (likedVynils.includes(selectedVynil._id)) {
      setIsLikedVynil(true)
    } else {
      setIsLikedVynil(false)
    }
  }, [likedVynils])

  const handleFavorites = (favorites) => {
    setLikedVynils(favorites)
  }

   // hacer la busqueda d evinilos al entrar
  useEffect(() => {
    setFilter("nothing")
  }, [])

  
  return (<Routes>
    <Route path="/" element={<LoginPage handleFavorites={handleFavorites}/>} />
    <Route path="/vynils" element={<MainPage viewVinil={viewVynil} setAggregation={setAggregation} filter={filter} setFilter={setFilter} />} />
    <Route path="/login" element={<LoginPage handleFavorites={handleFavorites} />} />
    <Route path="/sign-up" element={<SignUpPage />} />
    <Route path="/create" element={<VinilCreate />} />
    <Route path="/viewVynil" element={<VinilInfo selectedVynil={selectedVynil} isLiked={isLikedVynil} setLikedVynils={setLikedVynils} />} />
    <Route path='/editVynil' element={<VynilEdit selectedVynil={selectedVynil} setSelectedVynil={setSelectedVynil} />} />
    <Route path='/user' element={<UserInfo />} />
    <Route path='/SectionPage' element={<SectionPage aggregation={aggregation} viewVynil={viewVynil} />} />
  </Routes>)
}

export default App
