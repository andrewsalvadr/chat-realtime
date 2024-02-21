"use client"

import { useEffect, useRef, useState } from 'react';
import { db, auth } from '../../firebase/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../auth';
import { useRouter } from 'next/navigation';
import { Box, Button, Container, List, ListItem, ListItemText, Paper, TextField, Typography, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout'; 
import Loading from '../components/loading';

const ChatRoom = () => {
  const router = useRouter();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      router.push('/');
      return;
    }

    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages = querySnapshot.docs.map(doc => ({
        ...doc.data(), 
        id: doc.id,
        createdAt: doc.data().createdAt?.toDate() 
      }));
      setMessages(fetchedMessages);
      setLoading(false);
    });

    return () => unsubscribe();  
  }, [currentUser, router]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (newMessage.trim() === '') return;

    try {
      await addDoc(collection(db, "messages"), {
        name: currentUser.displayName || currentUser.email,
        message: newMessage,
        createdAt: serverTimestamp(),
        uid: currentUser.uid,
        photoURL: currentUser.photoURL || null 
      });
      setNewMessage('');
    } catch (error) {
      console.error("Could not send message: ", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  if (loading) {
    return <Loading type="bubbles" />;
  }
  
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" sx={{ my: 4 }}>
        Chat Room
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        {currentUser ? (
          <Typography>
            Your profile: <span style={{ color: '#45A3E0' }}>{currentUser.displayName}</span>
          </Typography>
        ) : (
          <Typography>Not logged in</Typography>
        )}
       <IconButton 
        onClick={logout} 
        aria-label="logout"
        sx={{
          '&:hover': {
            color: '#45A3E0', 
          },

        }}
      >
        <LogoutIcon />
      </IconButton>
      </Box>
        
      {/* Messages Display */}
      <Paper sx={{ maxHeight: 400, overflowY: 'auto', mb: 2, padding: 1,}}>
        <List sx={{ width: '100%' }}>
          {messages.map((msg) => (
            <Box
              key={msg.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: currentUser && msg.uid === currentUser?.uid ? 'flex-end' : 'flex-start',
                marginBottom: '10px',
              }}
            >
              <Typography fontSize={'15px'} sx={{ mb: 1 }}>
                {msg.name}
              </Typography>
              <Box
                sx={{
                  display: 'inline-block',
                  padding: '10px 20px',
                  backgroundColor: msg.uid === currentUser?.uid ? '#45A3E0' : '#f0f0f0',
                  borderRadius: '20px',
                  borderTopRightRadius: msg.uid === currentUser?.uid ? '0' : '20px',
                  borderTopLeftRadius: msg.uid === currentUser?.uid ? '20px' : '0',
                  color: msg.uid === currentUser?.uid ? '#fff' : 'inherit',
                  textAlign: 'left',
                  maxWidth: '80%', 
                }}
              >
                <Typography fontSize={'14px'}>{msg.message}</Typography>
              </Box>
              <Typography variant="caption" sx={{ mt: 1, alignSelf: msg.uid === currentUser?.uid ? 'flex-end' : 'flex-start' }}>
              {new Date(msg.createdAt).toLocaleString()}
              </Typography>
            </Box>
          ))}
        </List>
      </Paper>

      <Box
      component="form"
      onSubmit={sendMessage}
      sx={{ display: 'flex', flexDirection: 'column' }}
    >
    <TextField
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();  
              sendMessage(e);  
            }
          }}
          variant="outlined"
          label="Type a message"
          multiline
          rows={2}
          sx={{ mb: 1 }} 
        />
    <Button 
    variant="contained" 
    type="submit" 
    sx={{ 
      mt: 3,
      mb: 2, 
      backgroundColor: '#02B6F1', 
      '&:hover': {
     backgroundColor: '#039be5' } }}
    fullWidth disabled={!newMessage.trim()}>
      Send
    </Button>
  </Box>
</Container>
  );
}

export default ChatRoom;