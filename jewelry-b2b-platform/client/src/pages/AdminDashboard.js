import React, { useEffect, useState, useContext } from 'react';
import {
  Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Button, useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const [pending, setPending] = useState([]);
  const toast = useToast();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchPendingCompanies();
  }, []);

  const fetchPendingCompanies = async () => {
    try {
      const { data } = await axios.get('/api/admin/pending', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPending(data);
    } catch (err) {
      toast({
        title: 'Failed to load pending companies',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.post(`/api/admin/approve/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({ title: 'Company Approved!', status: 'success', duration: 3000 });
      setPending(pending.filter(c => c._id !== id));
    } catch {
      toast({ title: 'Approval failed', status: 'error', duration: 3000 });
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(`/api/admin/reject/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({ title: 'Company Rejected!', status: 'warning', duration: 3000 });
      setPending(pending.filter(c => c._id !== id));
    } catch {
      toast({ title: 'Rejection failed', status: 'error', duration: 3000 });
    }
  };

  return (
    <Box maxW="6xl" mx="auto" mt={8} p={4} bg="white" borderRadius="lg" boxShadow="md">
      <Heading mb={6} color="primary">Pending Company Verifications</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Company Name</Th>
            <Th>GSTIN</Th>
            <Th>PAN</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {pending.length === 0 ? (
            <Tr>
              <Td colSpan={4} textAlign="center">No pending verifications.</Td>
            </Tr>
          ) : (
            pending.map((company) => (
              <Tr key={company._id}>
                <Td>{company.name}</Td>
                <Td>{company.gstin}</Td>
                <Td>{company.pan}</Td>
                <Td>
                  <Button size="sm" colorScheme="green" mr={2} onClick={() => handleApprove(company._id)}>Approve</Button>
                  <Button size="sm" colorScheme="red" onClick={() => handleReject(company._id)}>Reject</Button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AdminDashboard;
