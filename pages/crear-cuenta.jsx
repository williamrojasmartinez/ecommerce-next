import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import Layout from '../components/Layout'
import { AuthContext } from '../context/Auth'
import style from '../styles/Checkout.module.css'
import { useForm } from 'react-hook-form'


function CrearCuenta() {

 
  const {register, formState: { errors }, handleSubmit} = useForm();

   const router = useRouter()
 
   const { crear } = useContext(AuthContext)
 
 
   const onSubmit = async (data) => {
     const {nombre, email, password} = data
     console.log(nombre, email, password)
 
 
     try {
       await crear(email, password)
        router.push("/login")
     } catch (error) {
       console.log(error);
       swal({
        text: "La cuenta ya existe.",
        icon: "warning",
      })
     }
 
    }
 
   return (
     <div className={style.cajaForm}>
       <Layout>
        <form onSubmit={handleSubmit(onSubmit)} className={style.myForm}>
         
         <h2>Crear Cuenta</h2>
           
         <input className='inputNombre'
               type="text" 
               placeholder="Nombre" 
               {...register('name', { 
                required: true,
                pattern: /^[a-zA-ZÀ-ÿ\s]{3,20}$/,
                maxLength: 20,
                minLength: 3
                 })} 
               />
                {errors.name?.type === 'required' && <p className={style.errorsP}>El campo es obligatorio</p>}
                {errors.name?.type === 'pattern' && <p className={style.errorsP}>El campo No puede llevar números ni cararcteres especiales</p>}
                {errors.name?.type === 'maxLength' && <p className={style.errorsP}>El campo no puede superar 20 caracteres</p>}
                {errors.name?.type === 'minLength' && <p className={style.errorsP}>El campo no puede ser menor a 3 caracteres</p>} 
      
 
           <input className='inputEmail'
               type="text" 
               placeholder="Email" 
               {...register('email', { 
                required: true,
                pattern: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
                 })}
              /> 
              {errors.email?.type === 'required' && <p className={style.errorsP}>El campo es obligatorio</p>}
              {errors.email?.type === 'pattern' && <p className={style.errorsP}>El correo electrónico debe empezar por el nombre del usuario, Seguido por el símbolo de la arroba '@' y Por último el nombre del dominio del correo. ejemplo: usuario@dominio.com</p>}
           
           <input className='inputPass'
               type="password" 
               placeholder="Contraseña" 
               {...register('password', { 
                required: true,
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/,
                 })}
               />
               {errors.password?.type === 'required' && <p className={style.errorsP}>El campo es obligatorio</p>}
               {errors.password?.type === 'pattern' && <p className={style.errorsP}>La contraseña debe llevar al menos una letra minuscula, una mayuscula, un número, contener al menos 6 caracteres y no permite espacios</p>}
 
           <button type='submit' className={style.buttonEnviar}> crear cuenta </button>
         </form>
         </Layout>
    </div> 
   )
 }
 
 export default CrearCuenta









































 
