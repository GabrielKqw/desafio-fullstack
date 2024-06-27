
import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import api from '../services/api';

const ContractDetails: React.FC = () => {
  const [contract, setContract] = useState<any | null>(null); 

  useEffect(() => {
    async function fetchContract() {
      try {
        const response = await api.get('/user/contract'); 
        setContract(response.data);
      } catch (error) {
        console.error('Error fetching contract:', error);
      }
    }

    fetchContract();
  }, []);

  return (
    <Box p={4}>
      <Heading size="lg">Contract Details</Heading>
      {contract ? (
        <Box borderWidth="1px" borderRadius="lg" p={4}>
          <Heading size="md">{contract.plan.name}</Heading>
          <Text>Start Date: {contract.start_date}</Text>
          <Text>End Date: {contract.end_date}</Text>
          <Button colorScheme="green">Change Plan</Button>
        </Box>
      ) : (
        <Text>No active contract found.</Text>
      )}
    </Box>
  );
};

export default ContractDetails;
