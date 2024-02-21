"use client"

import React, { useState } from 'react'
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
  } from 'firebase/auth'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase/firebase';
import { 
    Typography, 
    Box, 
    Button, 
    CssBaseline, 
    TextField, 
    Link, 
    Paper, 
    Grid,
    AppBar,
    Alert,
    Snackbar,
    InputAdornment,
    IconButton,
  } from '@mui/material'; 
   import { useRouter } from "next/navigation";
import { useTheme} from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import HttpsIcon from '@mui/icons-material/Https';


const Register = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [alertType, setAlertType] = useState('success');
    const [alertMessage, setAlertMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
    });
  
    const { name, email, password } = formData;
  
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();
  
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
  
    const onChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const onSubmit = async (e) => {
      e.preventDefault();
      try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
  
        await updateProfile(auth.currentUser, { displayName: name });
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
  
        showAlert('success', 'Registration Successful!');
        router.push('/chatroom'); 
      } catch (error) {
        showAlert('error', 'Something went wrong with registration');
      }
    };
  
    return (
      <>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert sx={{ width: '100%' }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      
          <Grid item xs={12} md={6} lg={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 3,
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
                Registration
              </Typography>
              <form onSubmit={onSubmit} style={{ width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                  <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField
                    fullWidth
                    id="name"
                    label="Full Name"
                    name="name"
                    value={name}
                    onChange={onChange}
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                  <MailOutlineIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    value={email}
                    onChange={onChange}
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                  <HttpsIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={onChange}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Button 
                type="submit" 
                fullWidth 
                variant="contained" 
                sx={{ 
                  mt: 3,
                  mb: 2, 
                  backgroundColor: '#02B6F1', 
                  '&:hover': {
                 backgroundColor: '#039be5' } }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/" variant="body2">
                      Already have an account?
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Grid>
      </>
    );
  };
  
  export default Register;