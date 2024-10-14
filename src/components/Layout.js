import React from 'react';
import { Container } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <Container maxWidth="lg">
      
      <main>{children}</main>
   
    </Container>
  );
};

export default Layout;
