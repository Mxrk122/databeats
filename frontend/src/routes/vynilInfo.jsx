import React, { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../context/userContextProvider'
import DataBeatsLogo from '../assets/images/DataBeatsLogo.png'
import { Box, Button, Flex, Input, Text, Image } from "@chakra-ui/react";
//Creamos un main donde se pondrá el array de los vinilos con un formato json


const vynilInfo = ({selectedVynil, isLiked, setLikedVynils, rates}) => {

    const navigate = useNavigate()

    const { user } = React.useContext(UserContext)

    //Creamos un array de tipo JSON con los datos de los vinilos
    const vinilos = [
        selectedVynil
    ]

    // variables para ver y añadir comentarios
    const [vynilRates, setVynilRates] = useState([])
    const [vynilRate, setVynilRate] = useState(0)
    const [actualRate, setActualRate] = useState("")
    const [actualComment, setActualComment] = useState("")

    // actualizar comentarios
    const getVynilRates = async () => {
        const response = await fetch('http://localhost:4000/rates/' + selectedVynil._id)
        const data = await response.json()
        setVynilRates(data)
    }

    // Obtener calificacion del album actualizada
    const getVynilRate = async () => {
      const response = await fetch('http://localhost:4000/rates/avg/' + selectedVynil._id)
      const data = await response.json()
      setVynilRate(data[0]._id)
  }

    useEffect(() => {
        
        getVynilRates()
        getVynilRate()
    }, [])

    // controlar la calificacion
    useEffect(() => {
      if(actualRate < 0){
        setActualRate(0)
      } else if (actualRate > 100){
        setActualRate(100)
      }
    }, [actualRate])

    useEffect(() => {
        
    }, [vynilRates])

    //Verificar si el vinilo esta en favoritos
    const handleFavorite = async (event) => {
        event.preventDefault()
        const vynil = selectedVynil
        
        // Para editar es PATCH
        const response = await fetch('http://localhost:4000/users/favorite/' + user._id + '/' + vynil._id, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(vynil),
        })
        const data = await response.json()
        setLikedVynils(data)
    }

    // crear comentaario
    const handleCreateComment = async (event) => {
        event.preventDefault()

        if(actualRate === "" || actualComment === ""){
            return
        }

        // crear comentario

        const actualUser = user._id
        const username = user.username
        const vynil = selectedVynil._id
        const score = actualRate
        const comment = actualComment

        const rate = {
            actualUser,
            username,
            vynil,
            score,
            comment
        }

        console.log(JSON.stringify(rate))
        
        // Para eañadir es post
        const response = await fetch('http://localhost:4000/rates/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(rate),
        })
        const data = await response.json()
        getVynilRates()
        getVynilRates()
        getVynilRate()
    }

    const handleDelete = async () => {
        // Para eañadir es post
        const vynil = selectedVynil

        const response = await fetch('http://localhost:4000/vynils/' + selectedVynil._id, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(selectedVynil),
        })
        const data = await response.json()
        console.log(data)
        navigate('../vynils')
    }

    return (
    <Box 
    h="100vh" 
    w="100vw">
        <Box bgColor={"#ffca38"}>
      <Flex justify="space-between" p={4}>
        <Link to="/vynils">
          <Button>Volver</Button>
        </Link>
        <Box display="flex" justifyContent="center">
            <Image src={DataBeatsLogo} alt="Data Beats Logo" width="40px" height="40px"/>
        </Box>
        {user.admin && (
          <Flex>
            <Link to="/editVynil">
              <Button>Editar</Button>
            </Link>
            <Button ml={5} onClick={handleDelete}>
              Borrar
            </Button>
          </Flex>
        )}
      </Flex>
      
    </Box>
          
          <Box mt={10} display="flex" alignItems="center" p={4}>
            <Image src={vinilos[0].img} alt={vinilos[0].name} />
            <Box ml={10}>
              <Text fontWeight="bold" fontSize="lg">
                {vinilos[0].name}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {vinilos[0].artist}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {vinilos[0].year}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {vinilos[0].genre}
              </Text>
              <Text ffontWeight="bold" fontSize="lg">
                Informacion especial
              </Text>
              <Text fontSize="sm" color="gray.500">
                {"Género: " + vinilos[0].information.genre}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {"Escala: " + vinilos[0].information.scale}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {"Publicado en: " + vinilos[0].information.origin}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {"Idioma: " + vinilos[0].information.language}
              </Text>
            </Box>

            <Box ml={10}>
                <Text fontWeight="bold" fontSize="50px">
                  {"Calificacion promedio: " + vynilRate}
                </Text>
            </Box>

          </Box>
          
          <Box p={4}>
            <Button mt={10} variantColor={isLiked ? "red" : "teal"} onClick={handleFavorite}>
                {isLiked ? "NO ME GUSTA" : "ME GUSTA"}
            </Button>
          </Box>
          
          
          <Box mt={10} p={4}>
            <Input
              type="number"
              id="rate"
              placeholder="Calificacion sobre 100"
              min="1"
              max="100"
              value={actualRate}
              onChange={(event) => setActualRate(event.target.value)}
              mb={5}
            />
            <Input
              type="text"
              id="Comment"
              placeholder="Comentario"
              onChange={(event) => setActualComment(event.target.value)}
              mb={5}
            />
            <Button variantColor="teal" onClick={handleCreateComment}>Añadir comentario</Button>
          </Box>
          
          {vynilRates.map((rate) => (
            <Box
              p={6}
              borderWidth="1px"
              borderRadius="10px"
              borderColor="gray.300"
              mt={5}
              key={rate._id}
            >
              <Text fontWeight="bold">{rate.username}</Text>
              <Text fontSize="sm" color="gray.500">
                {rate.score}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {rate.comment}
              </Text>
            </Box>
          ))}
        </Box>
      );
      
      
}

export default vynilInfo