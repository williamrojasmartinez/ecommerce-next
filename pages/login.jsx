import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import Layout from '../components/Layout'
import { AuthContext } from '../context/Auth'
import swal from 'sweetalert';
import style from '../styles/Checkout.module.css'
import withAuth from '../components/withAuth';

function Login() {

  

  const router = useRouter()

  const { login } = useContext(AuthContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleChangeemail = (e) => {
    e.preventDefault()
    setEmail(e.target.value)
    console.log(email);
  }

  const handleChangepassword = (e) => {
    e.preventDefault()
    setPassword(e.target.value)
    console.log(password);
    
  }

  const handleSubmit = async (e) => {

    e.preventDefault()
    
    console.log(email, password);

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
    setEmail("")
    setPassword("")

    try {
       await login(email, password)
       setEmail("")
       setPassword("")
       router.push("/checkout")
    } catch (error) {
      console.log(error);
      swal({
        text: "Credenciales invalidas. Asegurate de craer una cuenta",
        icon: "warning"
      })
    }
      

    
  }

  return (
    <div className={style.cajaForm}>
      <Layout>
       <form onSubmit={handleSubmit} className={style.myForm}>
        
        <h2>Iniciar Sesion</h2>
          
           <input className='inputEmail'
              type="text" 
              placeholder="Email" 
              name="email" 
              required 
              value={email}
              onChange={handleChangeemail} 
             />   
             
             <input className='inputPass'
              type="password" 
              placeholder="Contraseña" 
              name="password" 
              required
              value={password}
              onChange={handleChangepassword} 
              />
             
             

         
          <button type='submit' className={style.buttonEnviar}> Iniciar </button>
        </form>
        </Layout>
   </div> 
  )
}

export default Login 
