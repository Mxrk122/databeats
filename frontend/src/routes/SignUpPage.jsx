import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import DataBeatsLogo from '../assets/images/DataBeatsLogo.png'

const SignUpPage = () => {
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()

  const handleSignUp = async (event) => {
    event.preventDefault()
    if (password === confirmPassword) {
      const user = {
        username,
        firstName,
        lastName,
        password,
      }
      // Para editar es PATCH
      const response = await fetch('http://localhost:4000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      const data = await response.json()
      console.log(data)
      navigate('/login')
    } else {
      console.log('contraseñas no coinciden')
    }
  }

  return (
    <main>
      <div className="sign-up-container">
        <div className="sign-up-icon-container">
          <img src= {DataBeatsLogo} alt="Data Beats Logo" />
          <h1>¡Registrate para visualizar nuestra tienda!</h1>
        </div>
        <div className="sign-up-form">
          <input
            type="text"
            id="username"
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="text"
            id="Nombre"
            placeholder="Nombre"
            onChange={(event) => setFirstName(event.target.value)}
          />
          <input
            type="text"
            id="Apellidos"
            placeholder="Apellidos"
            onChange={(event) => setLastName(event.target.value)}
          />
          <input
            type="password"
            id="Contraseña"
            placeholder="Contraseña"
            onChange={(event) => setPassword(event.target.value)}
          />
          <input
            type="password"
            id="Confirmar-contraseña"
            placeholder="Confirmar contrseña"
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
        <button onClick={handleSignUp}>Registrarse</button>
        <p>
          Si ya posees una cuenta, también puedes <Link to="/login">Iniciar Sesión</Link> aquí.
        </p>
      </div>
    </main>
  )
}

export default SignUpPage
