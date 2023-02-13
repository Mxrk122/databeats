import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContextProvider'
import { Box, Flex, Button, Image, Text } from '@chakra-ui/react';

const ChartPage  = () => {

    const charts = [
        { id: '63ea9436-28ca-41b6-8f4b-1430585e7ce6' },
        { id: '63ea9605-1d7c-4be3-8bbc-780c6cf8efc1' },
        { id: '63ea97f5-f7c5-4555-8409-fda2c81b9f45' }
    ]

    return (
        <Box>
          <Flex p={4} bg="#ffca38" align="center">
            <Link to="/vynils">
              <Button>Volver</Button>
            </Link>
            <Text ml={2} color="black" fontWeight={"bold"}>
              Charts
            </Text>
          </Flex>
          <Box p={4}>
            <Box className='charts-container'>
              {charts.map((chart, index) => (
                <Box
                  key={chart.id}
                  bg="white"
                  p={4}
                  shadow="lg"
                  borderRadius="lg"
                  mb={4}
                >
                  <iframe
                    width="100%"
                    height="480"
                    src={`https://charts.mongodb.com/charts-project-0-dfebe/embed/charts?id=${chart.id}&maxDataAge=3600&theme=light&autoRefresh=true`}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      );
};
    


export default ChartPage


