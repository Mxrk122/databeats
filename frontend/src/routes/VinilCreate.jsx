import React, { useState } from 'react'
import DataBeatsLogo from '../assets/images/DataBeatsLogo.png'
import { Link, useNavigate} from 'react-router-dom'
import { Box, Input, Button, Flex, Image, Text} from '@chakra-ui/react'

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
      <Flex
        align='center'
        justify='space-between'
        w='auto'
        px='10'
        py='5'
        borderBottomWidth='1px'
        borderBottomColor='gray.200'
        bgColor={"#ffca38"}
      >
        <Box display="flex" justifyContent="center"
        >
            <Image 
            src={DataBeatsLogo} 
            alt="DataBeatsLogo"
            h="50px"
            w="50px"
            />
        </Box>

        <Button
          as={Link}
          to='/vynils'
        >Volver</Button>
      </Flex>
      <Box 
        bg="white"
        p={6}
        rounded="md"
        shadow="md"
        w="auto"
        h="auto"
        m="auto"
        mt="10"
        mb="10"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        
      >
        <Flex
          justifyContent='center'
          alignItems='center'
          flexDirection="column"
          verticalAlign='center'
          w='500px'
          h='auto'
          m='auto'
          mt='-10'
          mb='10'
        >
          <Input
            type="text"
            id="name"
            placeholder="Nombre del vinilo"
            onChange={(event) => SetName(event.target.value)}
            m='5px'
            
          />
          <Input
            type="text"
            id="Artist"
            placeholder="Artista del vinilo"
            onChange={(event) => setArtist(event.target.value)}
            m='5px'
            
          />
          <Input
            type="Number"
            id="Year"
            placeholder="Año del vinilo"
            onChange={(event) => setYear(event.target.value)}
            m='5px'
          />
          <Input
            type="text"
            id="img"
            placeholder="Link de imagen del vinilo jeje"
            onChange={(event) => setImg(event.target.value)}
            m='5px'
          />
          <Input
            type="text"
            id="genre"
            placeholder="Genero del vinilo"
            onChange={(event) => setGenre(event.target.value)}
            m='5px'
          />
          <Input
            type="text"
            id="scale"
            placeholder="Escala en la que el disco esta escrito mayormente"
            onChange={(event) => setScale(event.target.value)}
            m='5px'
          />
          <Input
            type="text"
            id="origin"
            placeholder="Pais donde fue publicado"
            onChange={(event) => setOrigin(event.target.value)}
            m='5px'
          />
          <Input
            type="text"
            id="language"
            placeholder="Lenguaje del disco"
            onChange={(event) => setLanguage(event.target.value)}
            m='5px'
            
          />
        </Flex>
        <Button 
        onClick={handleCreate}
        w='200px'
        h='50px'
        >Crear vinilo</Button>
      </Box>
      <Box as='footer'
        w='auto'
        h='auto'
        p='10'
        bgColor={"#ffca38"}
      >
        <Text
          textAlign='center'
          fontSize='sm'
        >
          DataBeats © 2023
        </Text>
      </Box>
    </Box>
  )
}

export default Create