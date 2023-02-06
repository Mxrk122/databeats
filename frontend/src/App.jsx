import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainPage from './routes/MainPage'
import LoginPage from './routes/LoginPage'
import SignUpPage from './routes/SignUpPage'
import VinilCreate from './routes/VinilCreate'
import VinilInfo from './routes/VinilInfo'

const App = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/vynils" element={<MainPage />} />
    <Route path="/vynils-admin" element={<MainAdminPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/sign-up" element={<SignUpPage />} />
    <Route path="/create" element={<VinilCreate />} />
    <Route path="/viewVinil" element={<VinilInfo />} />
  </Routes>
)

export default App
