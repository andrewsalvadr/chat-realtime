"use client"

import React from 'react'
import { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../firebase/firebase'
import { 
    Typography, 
    Box, 
    Button, 
    Container,
    TextField, 
    InputAdornment,
    Grid,
    Alert,
    Snackbar,
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useRouter } from 'next/navigation';


const ForgotPassword = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [alertType, setAlertType] = useState("success");
    const [alertMessage, setAlertMessage] = useState("");
    const [email, setEmail] = useState('');
  
    const onChange = (e) => setEmail(e.target.value);
  
    const showAlert = (type, msg) => {
      setAlertType(type);
      setAlertMessage(msg);
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
  
    const onSubmit = async (e) => {
      e.preventDefault();
      sendPasswordResetEmail(auth, email)
        .then(() => {
          showAlert('success', 'An email was sent. If you do not receive it in your inbox, please check your spam folder.');
          setEmail(""); 
        })
        .catch((error) => {
          showAlert('error', 'Could not send reset email. Please make sure the email is correct.');
        });
    };
  
    return (
      <Container component="main" maxWidth="xs">
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert sx={{ width: '100%' }}>
            {alertMessage}
          </Alert>
        </Snackbar>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Forgot Password?
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'center', mb: 3 }}>
            Enter your account email, and we'll send you a link to reset your password.
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={onChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#02B6F1', '&:hover': { backgroundColor: '#039be5' } }}
            >
              Submit
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Button sx={{ mt: 2, textTransform: 'none' }} onClick={() => router.push('/')}>
                  Back to Sign In
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
  };
  
  export default ForgotPassword;
  