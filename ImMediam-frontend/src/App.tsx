// src/App.tsx
import React from 'react';
import { ChakraProvider, Container, Heading } from '@chakra-ui/react';
import Profile from './pages/Profile';

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Container maxW="container.lg" py={8}>
        <Heading as="h1" size="xl" mb={4}>
          Subscription Management System
        </Heading>
        <Profile />
      </Container>
    </ChakraProvider>
  );
};

export default App;
