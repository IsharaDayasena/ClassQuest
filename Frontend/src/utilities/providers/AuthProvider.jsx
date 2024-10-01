import React, { createContext, useEffect, useState } from 'react'
export const AuthContext = createContext();
import { getAuth, createUserWithEmailAndPassword, signOut, updateProfile, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { ThemeProvider } from '@emotion/react';
import {  signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import axios from 'axios';
import { app } from '../../Config/firebase.init';


const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
     const [loader,setLoader] = useState(true)
     const [error,setError] = useState('')   

     const auth = getAuth(app);

     //signup new user
     const signUp = async (email,password) =>{
        try{
            setLoader(true);
            return await createUserWithEmailAndPassword(auth, email, password)

        }catch(error){
            setError(error.code )
            throw error;
        }
     }

     //login user 
     const login = async (email,password) =>{
        
        try{
            setLoader(true)
            return await signInWithEmailAndPassword(auth, email, password)
            
        }
        catch(error){
            setError(error.code)
            throw error
        }
     }
    // const login = async (email, password) => {
    //     try {
    //       const userCredential = await signInWithEmailAndPassword(auth, email, password);
    //       const token = await userCredential.user.getIdToken();
    //      localStorage.setItem('token', token); 
    //       setUser(userCredential.user);
    //       return userCredential;

    //     } catch (error) {
    //       // handle error
    //     }
    //   };
 

     //logout users
     const logout = async () =>{
        try{
            return await signOut(auth)
            
        }
        catch(error){
            setError(error.code)
            throw error
        }
     }

     //update user profile
     const updateUser = async (name,photo)=>{
        try{
            return await updateProfile(auth.currentUser,{
                displayName:name, photoURL: photo
            })
            setUser(auth.currentUser)
        }
        catch(error){
            setError(error.code)
            throw error
        }
     }

     //google login
     const googleProvider = new GoogleAuthProvider();
     const googleLogin = async () =>{
        try{
            setLoader(true)
          return  await signInWithPopup(auth, googleProvider)
        }
        catch(error){
            setError(error.code)
            throw error
        }
     }

     //observer for users
     useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged((user)=>{
            setUser(user)
            if(user){
                axios.post('http://localhost:5000/api/set-token',{email: user.email, name: user.displayName})
                .then((data)=>{
                    if(data.data.token){
                        localStorage.setItem('token', data.token);
                        setLoader(false)
                    }
                })
                
                }
                else{
                 localStorage.removeItem('token')
                    setLoader(false)
               
            }
        })
        return ()=> unsubscribe()
     },[])


    const contextValue = {user,signUp,login,logout,updateUser,googleLogin,error,setError,loader,setLoader}
  return (
    <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider