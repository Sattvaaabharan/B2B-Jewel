// src/pages/UserDashboard.js

import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  VStack,
  Button,
  Text,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const { token, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const [recentRFQs, setRecentRFQs] = useState([]);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const [companyProfile, setCompanyProfile] = useState(null);

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Example calls to your backend API - replace URLs with your actual endpoints

      // Fetch recent RFQs posted by this user
      const rfqsRes = await axios.get('/api/rfq/recent', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecentRFQs(rfqsRes.data || []);

      // Fetch unread messages count
      const messagesRes = await axios.get('/api/messages/unread-count', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUnreadMessagesCount(messagesRes.data.count || 0);

      // Fetch company profile info (assuming user has a linked company)
      const profileRes = await axios.get('/api/company/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCompanyProfile(profileRes.data);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast({
        title: 'Failed to fetch dashboard data',
        description: err.response?.data?.message || err.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={20}>
        <Spinner size="xl" />
        <Text mt={4}>Loading your dashboard...</Text>
      </Box>
    );
  }

  return (
    <Box maxW="7xl" mx="auto" p={6} bg="white" borderRadius="md" boxShadow="md" minH="80vh">
      <Heading mb={6} color="primary">
        Welcome, {user?.username || 'User'}
      </Heading>

      <SimpleGrid columns={[1, 2, 3]} spacing={8} mb={10}>
        {/* Recent RFQs */}
        <Box p={5} rounded="md" border="1px" borderColor="gray.200">
          <Heading size="md" mb={4} color="accent">
            Recent RFQs
          </Heading>
          {recentRFQs.length === 0 && <Text>No recent RFQs.</Text>}
          <VStack align="start" spacing={3}>
            {recentRFQs.slice(0, 5).map((rfq) => (
              <Box key={rfq._id} p={3} bg="gray.50" borderRadius="md" width="100%">
                <Text fontWeight="bold">{rfq.product}</Text>
                <Text fontSize="sm" noOfLines={2}>
                  {rfq.specifications}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Qty: {rfq.quantity}
                </Text>
              </Box>
            ))}
          </VStack>
          <Button
            mt={4}
            size="sm"
            colorScheme="yellow"
            onClick={() => navigate('/rfqs')}
          >
            View All RFQs
          </Button>
        </Box>

        {/* Unread Messages */}
        <Box p={5} rounded="md" border="1px" borderColor="gray.200" textAlign="center">
          <Heading size="md" mb={4} color="accent">
            Unread Messages
          </Heading>
          <Stat>
            <StatNumber fontSize="4xl" color="primary">
              {unreadMessagesCount}
            </StatNumber>
            <StatHelpText>Messages waiting for your reply</StatHelpText>
          </Stat>
          <Button
            mt={4}
            size="sm"
            colorScheme="yellow"
            onClick={() => navigate('/messages')}
          >
            Go to Messages
          </Button>
        </Box>

        {/* Company Profile Snapshot */}
        <Box p={5} rounded="md" border="1px" borderColor="gray.200">
          <Heading size="md" mb={4} color="accent">
            Company Profile
          </Heading>
          {companyProfile ? (
            <>
              <Text fontWeight="bold" fontSize="lg">{companyProfile.name}</Text>
              <Text>GSTIN: {companyProfile.gstin}</Text>
              <Text>PAN: {companyProfile.pan}</Text>
              <Text>Status: {companyProfile.isVerified ? 'Verified' : 'Pending Verification'}</Text>
              <Button
                mt={4}
                size="sm"
                colorScheme="yellow"
                onClick={() => navigate('/profile')}
              >
                View / Edit Profile
              </Button>
            </>
          ) : (
            <Text>No company profile found.</Text>
          )}
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default UserDashboard;
