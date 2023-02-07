import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import MainPage from './routes/MainPage'
import LoginPage from './routes/LoginPage'
import SignUpPage from './routes/SignUpPage'
import VinilCreate from './routes/VinilCreate'
import VinilInfo from './routes/vynilInfo'
import VynilEdit from './routes/EditVynil'
import UserInfo from './routes/UserInfo'

const App = () => {

  const [selectedVynil, setSelectedVynil] = useState()

  const viewVynil = (vinyl) => {
    setSelectedVynil(vinyl)
  }

  useEffect(() => {
    console.log(selectedVynil)
  }, [selectedVynil])

  return (<Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/vynils" element={<MainPage viewVinil={viewVynil} />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/sign-up" element={<SignUpPage />} />
    <Route path="/create" element={<VinilCreate />} />
    <Route path="/viewVynil" element={<VinilInfo selectedVynil={selectedVynil} />} />
    <Route path='/editVynil' element={<VynilEdit selectedVynil={selectedVynil} setSelectedVynil={setSelectedVynil} />} />
    <Route path='/user' element={<UserInfo />} />
  </Routes>)
}

export default App
