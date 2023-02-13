import React, { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../context/userContextProvider'
import { Box, Button, Flex, Input, Text, Image } from "@chakra-ui/react";
//Creamos un main donde se pondrá el array de los vinilos con un formato json


const vynilInfo = ({selectedVynil, isLiked, setLikedVynils, rates}) => {

    const { user } = React.useContext(UserContext)

    //Creamos un array de tipo JSON con los datos de los vinilos
    const vinilos = [
        selectedVynil
    ]

    // variables para ver y añadir comentarios
    const [vynilRates, setVynilRates] = useState([])
    const [actualRate, setActualRate] = useState([])
    const [actualComment, setActualComment] = useState([])

    // actualizar comentarios
    const getVynilRates = async () => {
        const response = await fetch('http://localhost:4000/rates/' + selectedVynil._id)
        const data = await response.json()
        setVynilRates(data)
    }

    useEffect(() => {
        getVynilRates()
    }, [])

    useEffect(() => {
        console.log(vynilRates)
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
        const vynil = selectedVynil._id
        const score = actualRate
        const comment = actualComment

        const rate = {
            actualUser,
            vynil,
            score,
            comment
        }

        console.log(JSON.stringify(rate))
        
        // Para editar es PATCH
        const response = await fetch('http://localhost:4000/rates/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(rate),
        })
        const data = await response.json()
        getVynilRates()
        console.log(data)
    }

    return (
        <Box p={5}>
          <Flex justify="space-between">
            <Link to="/vynils">
              <Button variant="outline">Volver</Button>
            </Link>
            {user.admin && (
              <Flex>
                <Link to="/editVynil">
                  <Button variant="outline">Editar</Button>
                </Link>
                <Button variant="outline" ml={5}>
                  Borrar
                </Button>
              </Flex>
            )}
          </Flex>
      
          <Box mt={10} display="flex" alignItems="center">
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
            </Box>
          </Box>
      
          <Button mt={10} onClick={handleFavorite}>
            {isLiked ? "NO ME GUSTA" : "ME GUSTA"}
          </Button>
      
          <Box mt={10}>
            <Input
              type="number"
              id="rate"
              placeholder="Calificacion sobre 100"
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
            <Button onClick={handleCreateComment}>Añadir comentario</Button>
          </Box>
      
          {vynilRates.map((rate) => (
            <Box
              p={5}
              borderWidth="1px"
              borderRadius="10px"
              borderColor="gray.300"
              mt={5}
              key={rate._id}
            >
              <Text fontWeight="bold">{rate.user}</Text>
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