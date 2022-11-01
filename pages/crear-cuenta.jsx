import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import Layout from '../components/Layout'
import { AuthContext } from '../context/Auth'
import swal from 'sweetalert';
import style from '../styles/Checkout.module.css'


function CrearCuenta() {

 
   const router = useRouter()
 
   const { crear } = useContext(AuthContext)
 
   const [nombre, setNombre] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
 
 
   const handleChangeNombre = (e) => {
     e.preventDefault()
     setNombre(e.target.value)
    
   }
 
   const handleChangeCorreo = (e) => {
     e.preventDefault()
     setEmail(e.target.value)
    
   }
 
   const handleChangeContrasena = (e) => {
     e.preventDefault()
     setPassword(e.target.value)
   
   }
 
 
   const onSubmit = async (e) => {
     e.preventDefault()
     console.log(nombre, email, password)
 
 
     const name = document.querySelector(".inputNombre").value
         const expresionNom = /^[a-zA-ZÀ-ÿ\s]{3,20}$/
         if (!expresionNom.test(name)) {
           swal({
             text: "Para el Nombre solo se permite letras y espacios (entre 3 y 20 letras)",
             icon: "warning"
           })
         return false
       }
 
 
       const correo = document.querySelector(".inputEmail").value
         const expresionCorreo = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
         if (!expresionCorreo.test(correo)) {
           swal({
             text: "El correo electrónico debe empezar por el nombre del usuario, Seguido por el símbolo de la arroba '@' y Por último el nombre del dominio del correo. ejemplo: usuario@dominio.com",
             icon: "warning"
           })
         return false
       }
 
 
       const pass = document.querySelector(".inputPass").value
         const expresionPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/
         if (!expresionPass.test(pass)) {
           swal({
             text: "La contraseña debe llevar al menos una letra minuscula, una mayuscula, un número, contener al menos 6 caracteres y no permite espacios",
             icon: "warning"
           })
         return false
       }
 
 
 
     try {
       await crear(email, password)
         setNombre("")
         setEmail("")
         setPassword("")
        router.push("/checkout")
     } catch (error) {
       console.log(error);
       swal({
        text: "El correo ya existe. Intenta con otro correo.",
        icon: "warning"
      })
        setNombre("")
         setEmail("")
         setPassword("")
     }
 
    }
 
   return (
     <div className={style.cajaForm}>
       <Layout>
        <form onSubmit={onSubmit} className={style.myForm}>
         
         <h2>Crear Cuenta</h2>
           
         <input className='inputNombre'
               type="text" 
               placeholder="Nombre" 
               name="nombre"id="nombre"
               required
               value={nombre}
               onChange={handleChangeNombre} 
               />
      
 
           <input className='inputEmail'
               type="text" 
               placeholder="Email" 
               name="email"
               required 
               value={email}
               onChange={handleChangeCorreo} 
              /> 
              
           
           <input className='inputPass'
               type="password" 
               placeholder="Contraseña" 
               name="contrasena"
               required
               value={password}
               onChange={handleChangeContrasena}
               />
          
 
           <button type='submit' className={style.buttonEnviar}> crear cuenta </button>
         </form>
         </Layout>
    </div> 
   )
 }
 
 export default CrearCuenta






































 
