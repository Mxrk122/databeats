import React, { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../context/userContextProvider'
import { Box, Heading, Image, Text, Flex, Button, HStack, Radio } from '@chakra-ui/react'
//Creamos un main donde se pondrá el array de los vinilos con un formato json
const MainPage = ({ viewVinil, setAggregation }) => {
    const navigate = useNavigate()
    //Creamos un array de tipo JSON con los datos de los vinilos
    const [vynils, setVynils] = useState([])

    //Creamos el diccionario para la filtración de la información
    const [filters, setFilters] = useState({
        name: false,
        artist: false,
        year: false,
        genre: false,
    })

    const { user } = React.useContext(UserContext)

    useEffect(() => {
        const getVynils = async () => {
          const response = await fetch('http://localhost:4000/vynils')
          const data = await response.json()
          setVynils(data)
        }
        getVynils()
    }, [])

    const handleChoose = (vynil) => {
        viewVinil(vynil)
        navigate("../viewVynil")
    }

    //Lógica de cómo sería obtener los filtros de la base de datos

    const handleOnCheckbox = (e) => {
        
        setFilters({
            ...filters,
            [e.target.value]: e.target.checked
        })

        if (e.target.checked){
            const resultFilter = vynils.filter(item => item.name === e.target.checked)
            setVynils([
                ...vynils,
                resultFilter
            ])
        }
        else{
            const resultFilter = vynils.filter(item => item.name !== e.target.checked)
            setVynils([
                ...vynils,
                resultFilter
            ])
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
        h="100vh" 
        w="100vw"

        
        >
        <Flex
            align='center'
            justify='space-between'
            w='100%'
            borderBottomWidth='1px'
            borderBottomColor='gray.200'
            bgColor={"#ffca38"}
            p={4}
        >
        {(user.admin) ? <Button as={Link} to="/create">Añadir un vinilo</Button> : null}
        
        <Flex
            align='center'
            justifyContent='space-between'
            w='40%'
            px='8'
            py='5'
            bgColor={"#ffca38"}
        >
            <Heading as='h6'>Filtrar por: </Heading>
            <Radio
                value="name"
                onChange={handleOnCheckbox}
                isChecked={filters.name}
            >
                Nombre
            </Radio>
            <Radio
                value="artist"
                onChange={handleOnCheckbox}
                isChecked={filters.artist}
            >
                Artista
            </Radio>
            <Radio
                value="year"
                onChange={handleOnCheckbox}
                isChecked={filters.year}
            >
                Año
            </Radio>
            <Radio
                value="genre"
                onChange={handleOnCheckbox}
                isChecked={filters.genre}
            >
                Género
            </Radio>
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
          spacing={6}
          p={8}

        >
          {vynils.map((vinilo) => (
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
            bgColor = {'#FFFFFF'}
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

    )
}

export default MainPage