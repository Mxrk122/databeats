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
    <Route path="/vynils-admin" element={<MainAdminPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/sign-up" element={<SignUpPage />} />
    <Route path="/create" element={<VinilCreate />} />
    <Route path="/viewVynil" element={<VinilInfo selectedVynil={selectedVynil} />} />
    <Route path='/editVynil' element={<VynilEdit selectedVynil={selectedVynil} setSelectedVynil={setSelectedVynil} />} />
  </Routes>)
}

export default App
