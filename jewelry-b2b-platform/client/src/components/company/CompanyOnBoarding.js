import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box, Button, FormControl, FormLabel, Input, Stack, FormErrorMessage, useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function CompanyOnboarding({ onSuccess }) {
  const { token } = useContext(AuthContext);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (values) => {
    try {
      await axios.post('/api/company/register', values, { headers: { Authorization: `Bearer ${token}` } });
      toast({ title: "Company registered!", status: "success", duration: 3000 });
      reset();
      onSuccess && onSuccess();
    } catch (err) {
      toast({ title: "Registration failed", status: "error", duration: 3000 });
    }
  };

  return (
    <Box as="form" maxW="md" mx="auto" my={8} p={6} borderRadius="lg" boxShadow="md" onSubmit={handleSubmit(onSubmit)} bg="white">
      <Stack spacing={4}>
        <FormControl isInvalid={errors.name}>
          <FormLabel>Company Name</FormLabel>
          <Input {...register('name', { required: 'Company name is required' })} />
          <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.gstin}>
          <FormLabel>GSTIN</FormLabel>
          <Input {...register('gstin', { required: 'GSTIN is required' })} />
          <FormErrorMessage>{errors.gstin && errors.gstin.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.pan}>
          <FormLabel>PAN</FormLabel>
          <Input {...register('pan', { required: 'PAN is required' })} />
          <FormErrorMessage>{errors.pan && errors.pan.message}</FormErrorMessage>
        </FormControl>
        {/* Add more fields as needed */}
        <Button colorScheme="yellow" isLoading={isSubmitting} type="submit" width="full">
          Register
        </Button>
      </Stack>
    </Box>
  );
}

