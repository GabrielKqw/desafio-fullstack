
import React, { useState, useEffect } from 'react';
import { Box, Heading, Stack, Button } from '@chakra-ui/react';
import api from '../services/api';

const PlanList: React.FC = () => {
  const [plans, setPlans] = useState<any[]>([]); 

  useEffect(() => {
    async function fetchPlans() {
      try {
        const response = await api.get('/plans');
        setPlans(response.data);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    }

    fetchPlans();
  }, []);

  return (
    <Box p={4}>
      <Heading size="lg">Choose a Plan</Heading>
      <Stack spacing={4}>
        {plans.map((plan) => (
          <Box key={plan.id} borderWidth="1px" borderRadius="lg" p={4}>
            <Heading size="md">{plan.name}</Heading>
            <p>{plan.description}</p>
            <Button colorScheme="blue">Select Plan</Button>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default PlanList;
