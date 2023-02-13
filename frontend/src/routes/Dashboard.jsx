import React from "react";
import ChartsContainer from "./ChartsContainer";
import { Box, Button, Heading } from "@chakra-ui/react";


const Dashboard = ({ charts }) => (
  <Box>
    <Box mb={5}>
      <Heading as="h1" size="lg">
        Dashboard
      </Heading>
    </Box>
    <Button mb={5}>Add Chart</Button>
    <ChartsContainer charts={charts} />
  </Box>
);

export default Dashboard;
