import React, { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../context/userContextProvider'
import { Box, Text, Button, Image, Flex, Avatar } from "@chakra-ui/react";
//Creamos un main donde se pondrá el array de los vinilos con un formato json


const UserInfo = () => {
    

    // Contexto para adquirir el usuario
    const {user, setUser} = React.useContext(UserContext)

    const navigate = useNavigate()

    const handleSignOut = () => {
      setUser(null)
      navigate('../')
    }

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
        <Text fontSize="xl">Nombre de usuario: {user.information.username}</Text>
        <Text fontSize="lg">Nombre: {user.information.firstName}</Text>
        <Text fontSize="lg">Apellidos: {user.information.lastName}</Text>
      </Box>
    </Flex>
    <Button onClick={() => handleSignOut}>Cerrar sesión</Button>
  </Flex>
);

}

export default UserInfo