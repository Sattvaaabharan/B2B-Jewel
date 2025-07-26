import React, { useEffect, useState, useContext } from 'react';
import { Box, VStack, Textarea, Button, Text } from '@chakra-ui/react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

export const ConversationView = ({ conversation }) => {
  const { token, user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!conversation) return;
    axios.get(`/api/messages/${conversation._id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setMessages(res.data));
  }, [conversation, token]);

  const sendMessage = async () => {
    if (!msg.trim() || !conversation) return;
    await axios.post(`/api/messages/${conversation._id}`, { text: msg, receiverId: conversation.partnerId }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setMsg('');
    // refresh messages
    const res = await axios.get(`/api/messages/${conversation._id}`, { headers: { Authorization: `Bearer ${token}` } });
    setMessages(res.data);
  };

  return (
    <Box p={3} minH="300px" borderRadius="md" bg="gray.50">
      <VStack spacing={2} align="stretch">
        {messages.length === 0 && <Text>No messages yet.</Text>}
        {messages.map(m => (
          <Box
            key={m._id}
            alignSelf={m.senderId === user.id ? 'flex-end' : 'flex-start'}
            bg={m.senderId === user.id ? 'yellow.200' : 'gray.200'}
            p={2}
            borderRadius="md"
            maxWidth="70%"
          >
            <Text>{m.text}</Text>
            <Text fontSize="xs" color="gray.500">{new Date(m.createdAt).toLocaleString()}</Text>
          </Box>
        ))}
        <Box display="flex" w="100%" mt={4}>
          <Textarea value={msg} onChange={e => setMsg(e.target.value)} placeholder="Type your message..." />
          <Button onClick={sendMessage} colorScheme="yellow" ml={2}>Send</Button>
        </Box>
      </VStack>
    </Box>
  );
};
