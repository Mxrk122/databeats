import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DataBeatsLogo from '../assets/images/DataBeatsLogo.png'

const LoginPage = () => {
  const [users, setUsers] = useState()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch('http://localhost:4000/users')
      const data = await response.json()
      setUsers(data)
    }
    getUsers()
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    const user = users.find((user) => user.username === username)
    if (user) {
      if (user.password === password) {
        navigate('/chat')
      } else {
        console.log('Wrong password')
      }
    } else {
      console.log('User not found')
    }
  }

  return (
    <main>
      <div className="login-container">
        <div className="login-icon-container">
          <img src={DataBeatsLogo} alt="Data Beats Logo" />
          <h1>¡Bienvenido a Data Beats!</h1>
        </div>
        <div className="login-form">
          <input
            type="text"
            id="username"
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Iniciar Sesión</button>
        <p>
          ¿Aún no posees cuenta? <Link to="/sign-up">Registrate</Link> aquí.
        </p>
      </div>
    </main>
  )
}

export default LoginPage
