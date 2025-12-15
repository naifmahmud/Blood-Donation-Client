import React, { useEffect, useState } from 'react';
import {auth} from '../firebase/firebase.config'
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';



const AuthProvider = ({children}) => {

    const [user,setUser]=useState([]);
    const [loading,setLoading]=useState(true);


    const createUserWithEmail=(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const signInWithEmail=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }

    const signOutUser=()=>{
        setLoading(true);
        return signOut(auth);
    }
    

    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth,(currenUser)=>{
            setUser(currenUser);
            setLoading(false);
        })
        return (()=>
            unsubscribe());
    },[])


    const userInfo={
        createUserWithEmail,
        signInWithEmail,
        signOutUser,
        user,
        setUser,
        loading,
        setLoading
    }
    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;