import React, { useEffect, useState, useContext } from 'react';
import { List, ListItem } from '@chakra-ui/react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

export const ConversationsList = ({ onSelect }) => {
  const { token } = useContext(AuthContext);
  const [convos, setConvos] = useState([]);

  useEffect(() => {
    axios.get('/api/messages', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setConvos(res.data || []));
  }, [token]);

  return (
    <List spacing={1}>
      {convos.length === 0 && <ListItem>No conversations</ListItem>}
      {convos.map(c => (
        <ListItem
          key={c._id}
          p={2}
          borderRadius="md"
          bg="gray.50"
          mb={2}
          cursor="pointer"
          onClick={() => onSelect && onSelect(c)}
        >
          <strong>{c.partnerName || 'User'}</strong>
          <br />
          <small>{c.lastMessage}</small>
        </ListItem>
      ))}
    </List>
  );
};
