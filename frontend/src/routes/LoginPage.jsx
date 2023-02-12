import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DataBeatsLogo from '../assets/images/DataBeatsLogo.png'
import { UserContext } from '../context/userContextProvider'
import { 
  Box, 
  Input, 
  Button, 
  Heading, 
  Text, 
  Flex, 
  FormControl, 
  FormLabel, 
  Stack 
} from '@chakra-ui/react'

const LoginPage = ({ handleFavorites }) => {
  const [users, setUsers] = useState()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  // Contexto para adquirir y proveer el usuario a las demas paginas
  const { user, setUser } = React.useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch('http://localhost:4000/users')
      const data = await response.json()
      setUsers(data)
    }
    getUsers()
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    const user = users.find((user) => user.username === username)
    if (user) {
      if (user.password === password) {
        
        handleFavorites(user.favorites)
        setUser(user)
        navigate('/vynils')
      } else {
        console.log('Wrong password')
      }
    } else {
      console.log('User not found')
    }
  }

  return (
    <Flex 
      h="100vh" 
      w="100vw" 
      align="center" 
      justify="center" 
      direction="column"
      bgColor="#13955E"
    >
      <Box w={["100%", "30%"]} p={8} rounded="lg" bg="white" boxShadow="dark-lg">
        <Stack spacing={8}>
          <Box className="login-icon-container" align="center">
            <img src={DataBeatsLogo} alt="Data Beats Logo" />
            <Heading as="h1" textAlign="center">¡Bienvenido a Data Beats!</Heading>
          </Box>
          <FormControl>
            <FormLabel htmlFor="username" fontSize="lg" color="gray.600">Usuario</FormLabel>
            <Input
              type="text"
              id="username"
              placeholder="Username"
              onChange={(event) => setUsername(event.target.value)}
              rounded="lg"
              w="100%"
              mt={4}
              bg="gray.200"
              p={4}
              _focus={{ bg: "white", boxShadow: "outline" }}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password" fontSize="lg" color="gray.600">Contraseña</FormLabel>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              rounded="lg"
              w="100%"
              mt={4}
              bg="gray.200"
              p={4}
              _focus={{ bg: "white", boxShadow: "outline" }}
            />
          </FormControl>

          <Button 
            onClick={handleLogin}
            mt={8}
            w="100%"
            variantColor="green"
            variant="solid"
            rounded="lg"
            fontSize="lg"
            bg="grey.200"
            _hover={{ bg: "green.500" }}
            _active={{ bg: "green.700" }}>Iniciar Sesión</Button>
          
          <Text textAlign="center" mt={8} fontSize="sm" color="gray.500">
            ¿Aún no tienes una cuenta? <Link to="/sign-up">Regístrate</Link>
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
};

export default LoginPage;