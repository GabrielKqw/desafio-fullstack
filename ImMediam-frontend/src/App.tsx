import React from 'react';
import { UserProvider } from './context/UserContext';
import AppRoutes from './services/routes'; // Importe suas rotas

function App() {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  );
}

export default App;
