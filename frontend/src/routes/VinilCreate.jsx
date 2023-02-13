import React, { useState } from 'react'
import DataBeatsLogo from '../assets/images/DataBeatsLogo.png'
import { Link, useNavigate} from 'react-router-dom'
import { Box, FormControl, FormLabel, Input, Button, Flex, Image, Text } from '@chakra-ui/react'

const Create = () => {
  const [name, SetName] = useState('')
  const [artist, setArtist] = useState('')
  const [year, setYear] = useState('')
  const [img, setImg] = useState('')
  const [genre, setGenre] = useState('')
  const [scale, setScale] = useState('')
  const [origin, setOrigin] = useState('')
  const [language, setLanguage] = useState('')

  const navigate = useNavigate()

  const handleCreate = async (event) => {
    event.preventDefault()

    const information = {
      genre, scale, origin, language
    }

    const vynil = {
      name,
      artist,
      year,
      img,
      information
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
    <Box as='main'>
      <Flex className='button-back'>
        <Link to="/vynils"><button>Volver</button></Link>
      </Flex>
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
            type="text"
            id="img"
            placeholder="link de imagen del vinilo jeje"
            onChange={(event) => setImg(event.target.value)}
          />
          <input
            type="text"
            id="genre"
            placeholder="Genero del vinilo"
            onChange={(event) => setGenre(event.target.value)}
          />
          <input
            type="text"
            id="scale"
            placeholder="escala en la que el disco esta escrito mayormente"
            onChange={(event) => setScale(event.target.value)}
          />
          <input
            type="text"
            id="origin"
            placeholder="pais donde fue publicado"
            onChange={(event) => setOrigin(event.target.value)}
          />
          <input
            type="text"
            id="language"
            placeholder="lenguaje del disco"
            onChange={(event) => setLanguage(event.target.value)}
          />
        </div>
        <button onClick={handleCreate}>Crear vinilo</button>
      </div>
    </Box>
  )
}

export default Create