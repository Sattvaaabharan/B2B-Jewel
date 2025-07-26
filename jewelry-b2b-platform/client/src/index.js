import React, { useEffect, useState, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App';

const theme = extendTheme({
  colors: {
    primary: '#0f1951',
    accent: '#D4AF37'
  },
  fonts: {
    heading: "'Playfair Display', serif",
    body: "'Open Sans', sans-serif"
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);
