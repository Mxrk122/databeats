import React, { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../context/userContextProvider'
import { Box, Heading, Image, Text, Flex, Button, HStack, Radio } from '@chakra-ui/react'
//Creamos un main donde se pondrá el array de los vinilos con un formato json
const MainPage = ({ viewVinil, setAggregation, filter, setFilter }) => {
    const navigate = useNavigate()
    //Creamos un array de tipo JSON con los datos de los vinilos
    const [vynils, setVynils] = useState([])

    const { user } = React.useContext(UserContext)

    // busqueda cuando cambia el filtro
    useEffect(() => {
        const getVynils = async () => {
          const response = await fetch('http://localhost:4000/vynils/' + filter)
          const data = await response.json()
          setVynils(data)
        }
        getVynils()
    }, [filter])

    const handleChoose = (vynil) => {
        viewVinil(vynil)
        navigate("../viewVynil")
    }

    //Lógica de cómo sería obtener los filtros de la base de datos
    const handleOnCheckbox = (e) => { 
        switch (e) {
            case 'name':
                setFilter("name")
                break;
            case 'artist':
                setFilter("artist")
                break;
            case 'year':
                setFilter("year")
                break;
            case 'rating':
                console.log("rating")
                break;
            case 'comment':
                console.log("comment")
                break;
            default:
                break;
        }
    }
            // segun el criterio que aparezca el usuario podraa seleccionar una agregación especifica
            // por default esta sera favoritos
    const handleAggregation = (option) => {
                if (option === "favorites"){
                    setAggregation("favorites")
                }
    }



    return (
        <Box as= 'main'
            w='100%'
            h='100%'

        
        >
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
        {(user.admin) ? <Button as={Link} to="/create">Añadir un vinilo</Button> : null}
        {(user.admin) ? <Button as={Link} to="/charts">Ver charts</Button> : null}
        <Flex
            align='center'
            justifyContent='space-between'
            w='auto'
            px='8'
            py='5'
            bgColor={"#ffca38"}
        >
            <Heading as='h4'
            mr='10px'
            >Filtrar por:</Heading>
            <Box
            d='flex'
            alignItems='center'
            justifyContent='center'
            flexDirection='row'
            bgColor={"#ffca38"}
            >
                <Button 
                d='flex'
                alignItems='center'
                justifyContent='center'
                flexDirection='row'
                bgColor={"#ffca38"}
                onClick={() => handleOnCheckbox("name")}
                >Nombre</Button>

                <Button 
                d='flex'
                alignItems='center'
                justifyContent='center'
                flexDirection='row'
                bgColor={"#ffca38"}
                onClick={() => handleOnCheckbox("artist")}
                >Artista</Button>

                <Button 
                d='flex'
                alignItems='center'
                justifyContent='center'
                flexDirection='row'
                bgColor={"#ffca38"}
                onClick={() => handleOnCheckbox("year")}
                >Año</Button>
            </Box>
            
        </Flex>

        <Button as={Link} to="/user">
                Mi usuario
        </Button>

        <Button onClick={() => handleAggregation("favorites")} as={Link} to="/SectionPage">
                Ver Favoritos
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
        <Heading as='h1'
            fontSize='3xl'
            fontWeight='bold'
            textAlign='center'
            mb='5'
            >
                Catálogo 
            </Heading>
        <HStack
          w='100%'
          maxW='auto'
          d='flex'
          flexWrap='wrap'
          justifyContent='center'
          alignItems='center'
          m='5px'
        >
          {vynils.map((vinilo) => (
            <Box
              key={vinilo._id}
            m='5px'
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
            bgColor = {'#FFFFFF'}
            
            
            >
              <Image
                w='200px'
                h='200px'
              src={vinilo.img} alt={vinilo.name} />
              <Heading as='h1'
                fontSize='xl'
              >{vinilo.name}</Heading>
              <Text fontWeight='medium'>{vinilo.artist}</Text>
              <Text fontWeight='light'>{vinilo.year}</Text>
            </Box>
          ))}
        </HStack>
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

export default MainPage