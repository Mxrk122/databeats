import React, { useState } from 'react'
import DataBeatsLogo from '../assets/images/DataBeatsLogo.png'

const Create = () => {
  const [name, SetName] = useState('')
  const [artist, setArtist] = useState('')
  const [year, setYear] = useState('')

  return (
    <main>
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
        </div>
        <button onClick=''>Crear vinilo</button>
      </div>
    </main>
  )
}

export default Create