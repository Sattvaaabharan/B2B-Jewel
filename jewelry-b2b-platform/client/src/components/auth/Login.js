import React, { useState, useContext } from 'react';
import {
  Box, Input, Button, FormControl, FormLabel, Heading, VStack, useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', form);
      login(res.data.token, res.data.user);
      toast({
        title: `Welcome back, ${res.data.user.username}!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Redirect based on role
      if (res.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      toast({
        title: "Login failed.",
        description: err.response?.data?.message || err.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={12} p={8} boxShadow="md" borderRadius="lg" bg="white">
      <Heading mb={6} color="primary">Login</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" value={form.email} onChange={handleChange} />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" value={form.password} onChange={handleChange} />
          </FormControl>
          <Button colorScheme="yellow" type="submit" width="full">Login</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
