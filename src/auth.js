"use client"

import {Component, createContext, useContext, useEffect, useState} from 'react';
import {getAuth} from "firebase/auth"
import Loading from './app/components/loading';

const AuthContext = createContext({});

 export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const auth = getAuth()
        return auth.onIdTokenChanged(async (user) => {
            if (!user) {
                console.log('No ?User');
                setCurrentUser(null);
                setLoading(false);

                return;
            }
            const token = await user.getIdToken();
            setCurrentUser(user);
            setLoading(false)
            console.log('token', token);
            console.log('user', user);
        })
    }, [])

    if (loading) {
        return <Loading 
        type="bubbles" 
        color="#3AB8FF" 
        height={'10%'} 
        width={'10%'} />

    } else {
        return (
            <AuthContext.Provider value={{currentUser}}>
                {children}
            </AuthContext.Provider>
        )
    }
 }

export const useAuth = () => useContext(AuthContext)