import React, { useEffect, useState, useContext } from 'react';
import {
  Box, Heading, Button, Table, Thead, Tbody, Tr, Th, Td, useDisclosure, Modal,
  ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  FormControl, FormLabel, Input, Textarea, useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const RFQList = () => {
  const [rfqs, setRfqs] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [form, setForm] = useState({
    product: '',
    specifications: '',
    quantity: '',
    deliveryLocation: '',
    specialReqs: ''
  });
  const toast = useToast();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchRFQs();
  }, []);

  const fetchRFQs = async () => {
    try {
      const { data } = await axios.get('/api/rfq', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRfqs(data);
    } catch {
      toast({ title: 'Failed to load RFQs', status: 'error', duration: 3000 });
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await axios.post('/api/rfq', form, { headers: { Authorization: `Bearer ${token}` } });
      toast({ title: 'RFQ sent!', status: 'success', duration: 3000 });
      onClose();
      fetchRFQs();
      setForm({ product: '', specifications: '', quantity: '', deliveryLocation: '', specialReqs: '' });
    } catch {
      toast({ title: 'Send failed', status: 'error', duration: 3000 });
    }
  };

  return (
    <Box p={6} bg="white" borderRadius="md" boxShadow="md" maxW="6xl" mx="auto" mt={8}>
      <Heading mb={4} color="primary">Request for Quotes</Heading>
      <Button colorScheme="yellow" mb={4} onClick={onOpen}>Create New RFQ</Button>

      <Table variant="simple">
        <Thead><Tr>
          <Th>Product</Th><Th>Specs</Th><Th>Qty</Th><Th>Delivery</Th><Th>Special Requirements</Th>
        </Tr></Thead>

        <Tbody>
          {rfqs.length === 0 ? (
            <Tr><Td colSpan={5} textAlign="center">No RFQs found.</Td></Tr>
          ) : rfqs.map(rfq => (
            <Tr key={rfq._id}>
              <Td>{rfq.product}</Td><Td>{rfq.specifications}</Td><Td>{rfq.quantity}</Td><Td>{rfq.deliveryLocation}</Td><Td>{rfq.specialReqs}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New RFQ</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3} isRequired>
              <FormLabel>Product</FormLabel>
              <Input name="product" value={form.product} onChange={handleChange} />
            </FormControl>
            <FormControl mb={3} isRequired>
              <FormLabel>Specifications</FormLabel>
              <Textarea name="specifications" value={form.specifications} onChange={handleChange} />
            </FormControl>
            <FormControl mb={3} isRequired>
              <FormLabel>Quantity</FormLabel>
              <Input name="quantity" value={form.quantity} onChange={handleChange} type="number" />
            </FormControl>
            <FormControl mb={3} isRequired>
              <FormLabel>Delivery Location</FormLabel>
              <Input name="deliveryLocation" value={form.deliveryLocation} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Special Requirements</FormLabel>
              <Textarea name="specialReqs" value={form.specialReqs} onChange={handleChange} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="yellow" onClick={handleSubmit}>Send RFQ</Button>
            <Button ml={3} onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default RFQList;
