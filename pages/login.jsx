import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import Layout from '../components/Layout'
import { AuthContext } from '../context/Auth'
import { useForm } from 'react-hook-form'
import style from '../styles/Checkout.module.css'
import swal from 'sweetalert'

function Login() {

  const [datosInput, setDatosInput] = useState("")

  const {register, formState: { errors }, handleSubmit} = useForm();  

  const router = useRouter()

  const { login } = useContext(AuthContext)



  const onSubmit = async (data) => {

    const {email, password} = data
    
    console.log(email, password);


    try {
       await login(email, password)
       router.push("/checkout")
    } catch (error) {
      console.log(error);
      swal({
        text: "La cuenta no existen. Asegurate de crear una cuenta",
        icon: "warning",
      })
    }
      

    
  }

  return (
    <div className={style.cajaForm}>
      <Layout>
       <form onSubmit={handleSubmit(onSubmit)} className={style.myForm}>
        
        <h2>Iniciar Sesion</h2>
          
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
             
             

         
          <button type='submit' className={style.buttonEnviar}> Iniciar </button>
        </form>
        </Layout>
   </div> 
  )
}

export default Login 