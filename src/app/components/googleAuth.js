import { Button } from '@mui/material'
import { signInWithPopup } from 'firebase/auth'
import {  db, provider} from '../../firebase/firebase'
import {  useState} from 'react';
import {getAuth} from "firebase/auth"
import {  Box, Alert, Snackbar } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useRouter } from "next/navigation";


const GoogleAuth = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [alertType, setAlertType] = useState('success');
    const [alertMessage, setAlertMessage] = useState('');

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

    const loginWithGoogle = async () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const user = result.user;
                // Check if the user is new
                if (result._tokenResponse.isNewUser) {
                    // Add the user's info to Firestore
                    await setDoc(doc(db, 'users', user.uid), {
                        name: user.displayName,
                        email: user.email,
                        timestamp: serverTimestamp(),
                    });
                    showAlert('success', 'Registration successful!');
                } else {
                    showAlert('success', 'Login successful!');
                }
                router.push('/chatroom'); 
            }).catch((error) => {
                // Handle Errors here.
                const errorMessage = error.message;
                showAlert('error', `Login failed: ${errorMessage}`);
            });
    };

    return (
        <Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
            <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                onClick={loginWithGoogle}
                sx={{ mt: 3, mb: 2 }}
            >
                Sign in with Google
            </Button>
        </Box>
    );
};

export default GoogleAuth;
