// src/components/rfq/RFQList.js
import React, { useState, useEffect, useContext } from 'react';
import {
  Box, Table, Thead, Tbody, Tr, Th, Td, Input, Button, Select, HStack, Spinner, Text,
  useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const RFQList = () => {
  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    product: '',
    deliveryLocation: '',
  });
  const { token } = useContext(AuthContext);
  const toast = useToast();

  const limit = 10;

  const fetchRFQs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/rfq', {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          page,
          limit,
          product: filters.product,
          deliveryLocation: filters.deliveryLocation,
        }
      });
      setRfqs(data.rfqs);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast({ title: 'Failed to load RFQs', status: 'error', duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRFQs();
  }, [page]);

  const handleFilterChange = e => {   
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = () => {
    setPage(1);
    fetchRFQs();
  };

  return (
    <Box maxW="6xl" mx="auto" p={6} bg="white" borderRadius="md" boxShadow="md" mt={8}>
      <HStack spacing={4} mb={4}>
        <Input
          placeholder="Product"
          name="product"
          value={filters.product}
          onChange={handleFilterChange}
        />
        <Input
          placeholder="Delivery Location"
          name="deliveryLocation"
          value={filters.deliveryLocation}
          onChange={handleFilterChange}
        />
        <Button colorScheme="yellow" onClick={handleSearch}>Search</Button>
      </HStack>

      {loading ? (
        <Spinner size="xl" />
      ) : (
        <>
          <Table variant="striped" colorScheme="yellow">
            <Thead>
              <Tr>
                <Th>Product</Th>
                <Th>Specs</Th>
                <Th>Quantity</Th>
                <Th>Delivery</Th>
                <Th>Special Requirements</Th>
              </Tr>
            </Thead>
            <Tbody>
              {rfqs.length === 0 ? (
                <Tr>
                  <Td colSpan={5} textAlign="center">No RFQs found.</Td>
                </Tr>
              ) : (
                rfqs.map(rfq => (
                  <Tr key={rfq._id}>
                    <Td>{rfq.product}</Td>
                    <Td>{rfq.specifications}</Td>
                    <Td>{rfq.quantity}</Td>
                    <Td>{rfq.deliveryLocation}</Td>
                    <Td>{rfq.specialReqs}</Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>

          {/* Pagination controls */}
          <HStack justifyContent="center" spacing={4} mt={4}>
            <Button
              isDisabled={page === 1}
              onClick={() => setPage(p => Math.max(p - 1, 1))}
            >
              Previous
            </Button>
            <Text>Page {page} of {totalPages}</Text>
            <Button
              isDisabled={page === totalPages}
              onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            >
              Next
            </Button>
          </HStack>
        </>
      )}
    </Box>
  );
};

export default RFQList;
