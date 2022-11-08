import React, { createContext, useEffect, useState } from 'react'
import Cookies from "js-cookie"; 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase'



export const AuthContext = createContext()


function AuthProvider(props) {

   const [usuarioActual, setUsuarioActual] = useState({})

    useEffect(() => { 
         onAuthStateChanged(auth,(user) => {
             setUsuarioActual(user);
             Cookies.set("user", JSON.stringify(user));
         })
    },[])


    const  crear = async (email, password) => {
        const auth = getAuth();
        const nuevoUsuario = await  createUserWithEmailAndPassword(auth, email, password)
        return nuevoUsuario

    }

    const login =  (correo, contrasena) => {
        const auth = getAuth();
        return signInWithEmailAndPassword(auth, correo, contrasena)
    }

  
    const logout = () => {
      const auth = getAuth();
      return auth.logout();
    }


    const actualizaUsuario = (nombre) => {
      const auth = getAuth();
      updateProfile(auth.currentUser, {
      displayName: nombre
})
    }
  return (
    <AuthContext.Provider value={{crear, login, logout, actualizaUsuario, usuarioActual, setUsuarioActual }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider