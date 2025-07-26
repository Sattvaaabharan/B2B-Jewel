import React, { useEffect, useState, useContext } from 'react';
import { Box, Input, Button, FormControl, FormLabel, VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';

export default function CompanyRegistration() {
  const toast = useToast();
  const [form, setForm] = useState({
    name: '',
    gstin: '',
    pan: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/company/register', form);
      toast({
        title: 'Registered successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setForm({ name: '', gstin: '', pan: '' });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.msg || 'Unknown error.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="400px" mx="auto" p={5} borderWidth="1px" borderColor="accent" borderRadius="lg" boxShadow="md">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl id="name" isRequired>
            <FormLabel>Company Name</FormLabel>
            <Input name="name" value={form.name} onChange={handleChange} placeholder="e.g., ABC Jewellers" />
          </FormControl>
          <FormControl id="gstin" isRequired>
            <FormLabel>GSTIN</FormLabel>
            <Input name="gstin" value={form.gstin} onChange={handleChange} placeholder="GST Number" />
          </FormControl>
          <FormControl id="pan" isRequired>
            <FormLabel>PAN</FormLabel>
            <Input name="pan" value={form.pan} onChange={handleChange} placeholder="PAN Card Number" />
          </FormControl>
          <Button colorScheme="yellow" type="submit" width="full">
            Register
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
