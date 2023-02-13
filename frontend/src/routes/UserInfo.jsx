import React, { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../context/userContextProvider'
import { Box, Text, Button, Image, Flex, Avatar } from "@chakra-ui/react";
//Creamos un main donde se pondrá el array de los vinilos con un formato json


const UserInfo = () => {
    //Creamos un array de tipo JSON con los datos de los usuarios
    const [getUsers] = useState()

    // Contexto para adquirir el usuario
    const {user} = React.useContext(UserContext)

    const navigate = useNavigate()

    useEffect(() => {
        const getUsers = async () => {
        const response = await fetch('http://localhost:4000/users')
        const data = await response.json()
        getUsers(data)
        }
        getUsers()
    }, [])




return (
  <Flex direction="column" align="center" justify="center">
    <Box d="flex" justifyContent="space-between" alignItems="center" mb={5} p={4}>
      <Link to="/vynils">
        <Button>Volver</Button>
      </Link>
      {user.admin ? (
        <Link to="/editVynil">
          <Button>Editar</Button>
        </Link>
      ) : null}
    </Box>
    <Flex
      direction="column"
      align="center"
      justify="center"
      mb={5}
      p={5}
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
      width="500px"
    >
      <Box align="center">
        <Avatar name="user" size="350px" mb={5} />
        <Text fontSize="xl">Nombre de usuario: {user.username}</Text>
        <Text fontSize="lg">Nombre: {user.firstname}</Text>
        <Text fontSize="lg">Apellidos: {user.lastname}</Text>
      </Box>
    </Flex>
    <Button>Cerrar sesión</Button>
  </Flex>
);

}

export default UserInfo