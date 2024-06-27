import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import PlanList from '../../components/PlanList';
import ContractDetails from '../../components/ContractDetails';

const Home: React.FC = () => {
  return (
    <Flex justify="center" align="center" h="100vh">
      <Box maxW="600px" w="100%" p={8}>
        <PlanList />
      </Box>
      <Box maxW="600px" w="100%" p={8}>
        <ContractDetails />
      </Box>
    </Flex>
  );
};

export default Home;
