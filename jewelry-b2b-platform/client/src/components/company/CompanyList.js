import React, { useState, useEffect, useContext } from 'react';
import {
  Box, Table, Thead, Tbody, Tr, Th, Td, Spinner, Input, Button, HStack, Select, Text
} from '@chakra-ui/react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const CompanyList = () => {
  const { token } = useContext(AuthContext);
  const [companies, setCompanies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ name: '', gstin: '', isVerified: '' });
  const [loading, setLoading] = useState(false);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/company/list', {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          ...filters,
          page,
          limit: 10
        }
      });
      setCompanies(data.companies);
      setTotalPages(data.totalPages);
    } catch (error) {
      // handle gracefully
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCompanies(); }, [page]);

  const handleFilterChange = e => setFilters({ ...filters, [e.target.name]: e.target.value });
  const handleSearch = () => { setPage(1); fetchCompanies(); };

  return (
    <Box maxW="6xl" mx="auto" p={6} bg="white" borderRadius="md" boxShadow="md" mt={8}>
      <HStack mb={4}>
        <Input
          placeholder="Name"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
        />
        <Input
          placeholder="GSTIN"
          name="gstin"
          value={filters.gstin}
          onChange={handleFilterChange}
        />
        <Select
          placeholder="Verification"
          name="isVerified"
          value={filters.isVerified}
          onChange={handleFilterChange}
        >
          <option value="true">Verified</option>
          <option value="false">Unverified</option>
        </Select>
        <Button colorScheme="yellow" onClick={handleSearch}>Search</Button>
      </HStack>

      {loading ? <Spinner /> : (
        <>
          <Table variant="striped" colorScheme="yellow">
            <Thead>
              <Tr>
                <Th>Name</Th><Th>GSTIN</Th><Th>Bank</Th><Th>Verified</Th>
              </Tr>
            </Thead>
            <Tbody>
              {companies.length === 0 ? (
                <Tr><Td colSpan={4}>No companies found.</Td></Tr>
              ) : (
                companies.map(company => (
                  <Tr key={company._id}>
                    <Td>{company.name}</Td>
                    <Td>{company.gstin}</Td>
                    <Td>{company.bankDetails?.bankName}</Td>
                    <Td>{company.isVerified ? '✔' : '✖'}</Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
          <HStack justify="center" mt={4}>
            <Button onClick={() => setPage(p => Math.max(p - 1, 1))} isDisabled={page === 1}>Prev</Button>
            <Text>Page {page} of {totalPages}</Text>
            <Button onClick={() => setPage(p => Math.min(p + 1, totalPages))} isDisabled={page === totalPages}>Next</Button>
          </HStack>
        </>
      )}
    </Box>
  );
};

export default CompanyList;
