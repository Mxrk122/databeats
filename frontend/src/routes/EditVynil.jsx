import React, { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../context/userContextProvider'
import { Box, Button, Flex, Input, Text, Image, Heading } from "@chakra-ui/react";
//Creamos un main donde se pondrá el array de los vinilos con un formato json
const EditVynil = ({selectedVynil, setSelectedVynil}) => {
    const [name, SetNewName] = useState(null)
    const [artist, setNewArtist] = useState(null)
    const [year, setNewYear] = useState(null)
    const [img, setNewImg] = useState(null)
    const [genre, setNewGenre] = useState(null)
    const [scale, setNewScale] = useState(null)
    const [origin, setNewOrigin] = useState(null)
    const [language, setNewLanguage] = useState(null)
    //Creamos un array de tipo JSON con los datos de los vinilos
    const vinilos = [
        selectedVynil
    ]

    const { user } = React.useContext(UserContext)

    const vynil_id = selectedVynil._id

    const handleUpdate = async (event) => {
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
        
        // Para editar es PATCH
        const response = await fetch('http://localhost:4000/vynils/' + vynil_id, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(vynil),
        })
        const data = await response.json()
        setSelectedVynil(data)
      }

    return (
        <Box as='main'>
        <Flex 
        align='center'
        justify='space-between'
        w='100%'
        px='10'
        py='5'
        borderBottomWidth='1px'
        borderBottomColor='gray.200'
        bgColor={"#ffca38"}
        >
            <Button as={Link} to="/viewVynil">Volver</Button>
        </Flex>
        <Box
        >
            <Box className="vinilo-edit">
                {vinilos.map((vinilo) => (
                    <Box className = "vinilo_edit" key={vinilo._id}>
                        <Image 
                        src = {vinilo.img} 
                        alt = {vinilo.name}
                        w = "500px"
                        h = "500px"
                        />
                        <Heading
                        fontSize="2xl"
                        fontWeight="semibold"
                        lineHeight="short"
                        as='h1'
                        >{vinilo.name}
                        </Heading>
                        <Input
                        type="text" 
                        id="New_name_vinil_id" 
                        placeholder={vinilo.name} 
                        onChange={(event) => SetNewName(event.target.value)}
                        w= '500px'
                        />
                        <Text
                        fontSize="xl"
                        fontWeight="semibold"
                        lineHeight="short"
                        >{vinilo.artist}</Text>
                        <Input 
                        type="text" 
                        id="New_artist_vinil_id" 
                        placeholder={vinilo.artist} 
                        onChange={(event) => setNewArtist(event.target.value)}
                        w= '500px'
                        />
                        <Text
                        fontSize="xl"
                        fontWeight="semibold"
                        lineHeight="short"
                        >{vinilo.year}</Text>
                        <Input 
                        type="Number" 
                        id="New_year_vinil_id" 
                        placeholder={vinilo.year} 
                        onChange={(event) => setNewYear(event.target.value)}
                        w= '500px'
                        />
                        <Text
                        fontSize="xl"
                        fontWeight="semibold"
                        lineHeight="short"
                        >Imagen</Text>
                        <Input 
                        type="text" 
                        id="New_img"
                        onChange={(event) => setNewImg(event.target.value)}
                        w= '500px'
                        />
                        <Text
                        fontSize="xl"
                        fontWeight="semibold"
                        lineHeight="short"
                        >Genero</Text>
                        <Input 
                        type="text" 
                        id="New_genre"
                        placeholder={vinilo.information.genre} 
                        onChange={(event) => setNewGenre(event.target.value)}
                        w= '500px'
                        />
                        <Text
                        fontSize="xl"
                        fontWeight="semibold"
                        lineHeight="short"
                        >Escala</Text>
                        <Input 
                        type="text" 
                        id="New_scale"
                        placeholder={vinilo.information.scale}
                        onChange={(event) => setNewScale(event.target.value)}
                        w= '500px'
                        />
                        <Text
                        fontSize="xl"
                        fontWeight="semibold"
                        lineHeight="short"
                        >País de publicación</Text>
                        <Input 
                        type="text" 
                        id="New_origin" 
                        placeholder={vinilo.information.origin}
                        onChange={(event) => setNewOrigin(event.target.value)}
                        w= '500px'
                        />
                        <Text
                        fontSize="xl"
                        fontWeight="semibold"
                        lineHeight="short"
                        >Idioma del disco</Text>
                        <Input 
                        type="text" 
                        id="New_lan"
                        placeholder={vinilo.information.language}
                        onChange={(event) => setNewLanguage(event.target.value)}
                        w= '500px'
                        />
                    </Box>
                ))}
            </Box>
            <Button
            onClick={handleUpdate}
            margin= '8px'
            >Enviar</Button>
        </Box>
        </Box>
    )
}

export default EditVynil