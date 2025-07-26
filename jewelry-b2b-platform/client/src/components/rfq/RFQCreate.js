import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box, Button, FormControl, FormLabel, Input, Textarea, FormErrorMessage, Stack, useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const RFQCreate = ({ onSuccess }) => {
  const { token } = useContext(AuthContext);
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (values) => {
    try {
      await axios.post('/api/rfq', values, { headers: { Authorization: `Bearer ${token}` } });
      toast({ title: "RFQ created!", status: "success", duration: 3000 });
      onSuccess && onSuccess();
    } catch (err) {
      toast({ title: "Failed to create RFQ", status: "error", duration: 3000 });
    }
  };

  return (
    <Box as="form" maxW="md" bg="white" p={6} borderRadius="md" boxShadow="md" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl isInvalid={errors.product} isRequired>
          <FormLabel>Product</FormLabel>
          <Input {...register('product', { required: 'Product is required' })} />
          <FormErrorMessage>{errors.product && errors.product.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.specifications} isRequired>
          <FormLabel>Specifications</FormLabel>
          <Textarea {...register('specifications', { required: 'Specifications are required' })} />
          <FormErrorMessage>{errors.specifications && errors.specifications.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.quantity} isRequired>
          <FormLabel>Quantity</FormLabel>
          <Input
            type="number"
            {...register('quantity', {
              required: 'Quantity is required',
              min: { value: 1, message: 'Quantity must be at least 1' }
            })}
          />
          <FormErrorMessage>{errors.quantity && errors.quantity.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.deliveryLocation} isRequired>
          <FormLabel>Delivery Location</FormLabel>
          <Input {...register('deliveryLocation', { required: 'Delivery location is required' })} />
          <FormErrorMessage>{errors.deliveryLocation && errors.deliveryLocation.message}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel>Special Requirements</FormLabel>
          <Textarea {...register('specialReqs')} />
        </FormControl>

        <Button colorScheme="yellow" isLoading={isSubmitting} type="submit">Create RFQ</Button>
      </Stack>
    </Box>
  );
};

export default RFQCreate;
