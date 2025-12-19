import React, { useEffect, useState } from 'react';
import {auth} from '../firebase/firebase.config'
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import axios from 'axios';



const AuthProvider = ({children}) => {

    const [user,setUser]=useState([]);
    const [loading,setLoading]=useState(true);
    const [roleLoading,setRoleLoading]=useState(true);
    const [role,setRole]= useState([]);
    const [userStatus,setUserStatus]= useState([]);

    console.log(user);
    

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


       useEffect(()=>{
       if(!user) return;

        axios.get(`http://localhost:5000/users/role/${user.email}`)
            .then(res=> {
                setRole(res.data.role);
                setUserStatus(res.data.user_status);
                setRoleLoading(false)
            })
    },[user])

    console.log(role);
   
    

    const userInfo={
        createUserWithEmail,
        signInWithEmail,
        signOutUser,
        user,
        setUser,
        loading,
        setLoading,
        role,
        setRole,
        roleLoading,
        userStatus
    }
    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;