import React, { useEffect, useState, useContext } from 'react';
import {
  Box, List, ListItem, Textarea, Button, Flex, Heading, VStack, useToast, Text
} from '@chakra-ui/react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Messaging = () => {
  const { token } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [selectedConv, setSelectedConv] = useState(null);
  const [newMsg, setNewMsg] = useState('');
  const toast = useToast();

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const { data } = await axios.get('/api/messages', { headers: { Authorization: `Bearer ${token}` } });
      setConversations(data);
    } catch {
      toast({ title: 'Failed to load conversations', status: 'error' });
    }
  };

  const fetchMessages = async (convId) => {
    try {
      const { data } = await axios.get(`/api/messages/${convId}`, { headers: { Authorization: `Bearer ${token}` } });
      setSelectedConv({ ...selectedConv, messages: data });
    } catch {
      toast({ title: 'Failed to load messages', status: 'error' });
    }
  };

  const handleSelectConv = (conv) => {
    setSelectedConv(conv);
    fetchMessages(conv._id);
  };

  const handleSendMessage = async () => {
    if (!newMsg.trim()) return;
    try {
      await axios.post(`/api/messages/${selectedConv._id}`, { text: newMsg }, { headers: { Authorization: `Bearer ${token}` } });
      setNewMsg('');
      fetchMessages(selectedConv._id);
    } catch {
      toast({ title: 'Send failed', status: 'error' });
    }
  };

  return (
    <Flex bg="white" borderRadius="md" boxShadow="md" maxW="7xl" mx="auto" mt={8} p={4} height="80vh">
      <Box w="28%" overflowY="auto" borderRight="1px solid #eee" pr={3}>
        <Heading size="md" mb={4} color="primary">Conversations</Heading>
        <List spacing={3}>
          {conversations.map(conv => (
            <ListItem
              key={conv._id}
              p={2}
              cursor="pointer"
              bg={selectedConv?._id === conv._id ? 'yellow.200' : 'transparent'}
              borderRadius="md"
              onClick={() => handleSelectConv(conv)}
            >
              <strong>{conv.partnerName}</strong>
              <br />
              <small>{conv.lastMessage}</small>
            </ListItem>
          ))}
          {conversations.length === 0 && <ListItem>No conversations</ListItem>}
        </List>
      </Box>

      <Box flex="1" ml={6} display="flex" flexDirection="column" justifyContent="space-between">
        <Heading size="md" color="primary" mb={4}>
          {selectedConv ? selectedConv.partnerName : 'Select a conversation'}
        </Heading>
        <Box flex="1" overflowY="auto" mb={4} border="1px solid #ddd" p={4} borderRadius="md">
          {selectedConv?.messages?.length ? (
            selectedConv.messages.map(msg => (
              <Box key={msg._id} mb={3} textAlign={msg.senderId === selectedConv.partnerId ? 'left' : 'right'}>
                <Box
                  display="inline-block"
                  p={2}
                  borderRadius="md"
                  bg={msg.senderId === selectedConv.partnerId ? 'gray.200' : 'yellow.300'}
                >
                  {msg.text}
                </Box>
                <br />
                <small>{new Date(msg.createdAt).toLocaleString()}</small>
              </Box>
            ))
          ) : (
            <Text>No messages</Text>
          )}
        </Box>

        {selectedConv && (
          <Flex>
            <Textarea
              flex="1"
              resize="none"
              value={newMsg}
              onChange={e => setNewMsg(e.target.value)}
              placeholder="Type your message..."
            />
            <Button colorScheme="yellow" ml={2} onClick={handleSendMessage}>
              Send
            </Button>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default Messaging;
