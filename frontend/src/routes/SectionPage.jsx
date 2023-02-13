import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContextProvider'
import { Box, Heading, Image, Text, Flex, Button, HStack } from '@chakra-ui/react'

const SectionPage = ({ aggregation, viewVynil }) => {
  const { user } = React.useContext(UserContext)
  const [selectedVynils, setSelectedVynils] = useState([])
  const navigate = useNavigate()

  const getAggregation = async () => {
    if (aggregation === 'genre') {
      const response = await fetch('http://localhost:4000/vynils/favorites/' + user._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      const data = await response.json()
      setSelectedVynils([])
    }
    if (aggregation === 'favorites') {
      const response = await fetch('http://localhost:4000/vynils/favorites/' + user._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      const data = await response.json()
      setSelectedVynils(data)
    }
  }

  const handleChoose = (vynil) => {
    viewVynil([])
    viewVynil(vynil)
    navigate('../viewVynil')
  }

  useEffect(() => {
    console.log('hola')
    getAggregation()
  }, [])

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
        <Button as={Link} to='/user'>
          Mi usuario
        </Button>
        <Button as={Link} to='/vynils'>
          Volver
        </Button>
      </Flex>
      <Box
        mt='30spx'
        p='5'
        d='flex'
        alignItems='center'
        justifyContent='center'
        flexDirection='column'
      >
        <Heading as='h1'>¡Mis discos favoritos!</Heading>
        <HStack
          w='100%'
          maxW='auto'
          d='flex'
          flexWrap='wrap'
          alignItems='center'
          justifyContent='center'
          spacing={6}
          p={8}
        >
          {selectedVynils.map((vinilo) => (
            <Box
              key={vinilo._id}
              onClick={() => handleChoose(vinilo)}
              cursor='pointer'
              borderWidth='1px'
              borderRadius='lg'
              borderColor='gray.200'
              w='250px'
              h='400px'
              display='flex'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
              boxShadow="md"
            >
              <Image src={vinilo.img} alt={vinilo.name} />
              <Heading as='h1'>{vinilo.name}</Heading>
              <Text fontWeight='medium'>{vinilo.artist}</Text>
              <Text fontWeight='light'>{vinilo.year}</Text>
            </Box>
          ))}
        </HStack>
      </Box>
    </Box>
  );


    };

export default SectionPage;
