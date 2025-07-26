// theme.js

import { extendTheme } from '@chakra-ui/react';

const royalTheme = extendTheme({
  colors: {
    primary: '#0f1951',   // royal blue
    secondary: '#48005e', // royal purple
    accent: '#D4AF37',    // gold
    background: '#ffffff',
    text: '#222222',
  },
  fonts: {
    heading: `'Playfair Display', serif`,
    body: `'Open Sans', sans-serif`,
  },
  components: {
    Button: {
      variants: {
        royal: {
          bg: 'accent',
          color: 'white',
          fontWeight: 'bold',
          _hover: { bg: 'secondary' },
        },
      },
    },
  },
});

export default royalTheme;


// Chakra Box with shimmer animation
import { keyframes } from '@emotion/react';

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

<Box
  bgGradient="linear(to-r, #D4AF37, #48005E, #0f1951)"
  bgSize="200% 100%"
  animation={`${shimmer} 5s linear infinite`}
  p={10}
  borderRadius="lg"
>
  {/* Content */}
</Box>


import React from 'react';
import { Box, Heading, Text, Button, VStack, Image } from '@chakra-ui/react';
import jewelImage from '../assets/futuristic-diamond.svg'; // Your svg/image

const HomePage = () => {
  return (
    <Box minH="100vh" bg="primary" color="accent" px={8} py={20}>
      <VStack spacing={8} maxW="4xl" mx="auto" textAlign="center">
        <Heading fontSize={['4xl', '6xl']} fontFamily="heading" textShadow="2px 2px #D4AF37">
          Welcome to The Royal Jewelry B2B Ecosystem
        </Heading>

        <Text fontSize={['md', 'xl']} maxW="lg" color="gray.200">
          Connect with verified suppliers, manufacturers, and jewelers in a secure, trusted digital marketplace designed especially for the diamond and jewelry industry.
        </Text>

        <Button size="lg" variant="royal" onClick={() => window.location.href = '/register'}>
          Get Started
        </Button>

        <Box boxSize={['200px', '350px']} mt={10}>
          <Image src={jewelImage} alt="Futuristic Diamond" />
        </Box>
      </VStack>
    </Box>
  );
};

export default HomePage;
