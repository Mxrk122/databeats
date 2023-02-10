import React, { useState } from 'react'
import DataBeatsLogo from '../assets/images/DataBeatsLogo.png'
import { Link, useNavigate} from 'react-router-dom'

const Create = () => {
  const [name, SetName] = useState('')
  const [artist, setArtist] = useState('')
  const [year, setYear] = useState('')
  const [img, setImg] = useState('')
  const [songs, setSongs] = useState('')

  const navigate = useNavigate()

  const handleCreate = async (event) => {
    event.preventDefault()
    const vynil = {
      name,
      artist,
      year,
      img,
    }
    // Para publicar es POST
    const response = await fetch('http://localhost:4000/vynils', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vynil),
    })
    const data = await response.json()
    // La informacion de este vinilo se aprovechara para postear canciones
    console.log(data)
    navigate('../vynils')
  }

  // Generar canciones
  const generateSongs = () => {
    for (let i = 0; i < songs; i++){
      persons.push(<p>{data[i].name + ", " + data[i].age + " years old"}</p>)
    }
  }

  return (
    <main>
      <div className='button-back'>
        <Link to="/vynils"><button>Volver</button></Link>
      </div>
      <div className="create-vinil-container">
        <div className="create-vinil-form">
          <input
            type="text"
            id="name"
            placeholder="Nombre del vinilo"
            onChange={(event) => SetName(event.target.value)}
          />
          <input
            type="text"
            id="Artist"
            placeholder="Artista del vinilo"
            onChange={(event) => setArtist(event.target.value)}
          />
          <input
            type="Number"
            id="Year"
            placeholder="Año del vinilo"
            onChange={(event) => setYear(event.target.value)}
          />
          <input
            type="Number"
            id="songs"
            placeholder="cantidad de canciones"
            onChange={(event) => setSongs(event.target.value)}
          />
          <input
            type="text"
            id="img"
            placeholder="link de imagen del vinilo jeje"
            onChange={(event) => setImg(event.target.value)}
          />
        </div>
        <button onClick={handleCreate}>Crear vinilo</button>
      </div>
    </main>
  )
}

export default Create