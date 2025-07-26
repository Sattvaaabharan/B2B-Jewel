import React, { useState, useContext } from 'react';
import {
  Box, Input, Button, FormControl, FormLabel, Heading, VStack, useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', form);
      toast({
        title: "Registered successfully. Please login.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate('/login');
    } catch (err) {
      toast({
        title: "Registration failed.",
        description: err.response?.data?.message || err.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={12} p={8} boxShadow="md" borderRadius="lg" bg="white">
      <Heading mb={6} color="primary">Register</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input name="username" value={form.username} onChange={handleChange} />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" value={form.email} onChange={handleChange} />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" value={form.password} onChange={handleChange} />
          </FormControl>
          <Button colorScheme="yellow" type="submit" width="full">Register</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Register;
