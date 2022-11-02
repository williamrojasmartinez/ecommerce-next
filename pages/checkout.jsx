import firebaseApp from '../firebase'
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import Link from 'next/link';
import style from '../styles/Checkout.module.css'
import Layout from '../components/Layout';
import swal from 'sweetalert';
import withAuth from '../components/withAuth';





function Checkout(props) {
  

    const [comprador, setComprador] =useState({})
    const [orderId, setOrderId] =useState('')

    const { cart } = useContext(CartContext)
    const { precioTotal } = useContext(CartContext)
    const { vaciarCart } = useContext(CartContext)
    

     const datosComprador = (e) => {
         //e.preventDefault()
         setComprador({
             ...comprador,
             [e.target.name]: e.target.value
         })
     }



    const finalizarCompra = (e) => {
        e.preventDefault()


        const name = document.querySelector(".inputNombre").value
        const expresionNom = /^[a-zA-ZÀ-ÿ\s]{3,20}$/
        if (!expresionNom.test(name)) {
          swal({
            text: "Para el Nombre solo se permite letras y espacios (entre 3 y 20 letras)",
            icon: "warning"
          })
        return false
      }



        const tel = document.querySelector(".inputTel").value
        const expresionTel = /^[3|6]?[ -]*([0-9][ -]*){10}$/
        if (!expresionTel.test(tel)) {
          swal({
            text: "Para el Telefono solo se permiten números que empiecen por 3 o 6 y obligatoriamente tener 10 digitos en total",
            icon: "warning"
          })
        return false
      }



        const cardNumber = document.querySelector(".inputCard").value
        const expresionCardNumber = /^[4|5]\d{3}-?\d{4}-?\d{4}-?\d{4}$/
        if (!expresionCardNumber.test(cardNumber)) {
          swal({
            text: "El número de la tarjeta tiene que comenzar con 4 ó 5. Y debe contener 16 dígitos",
            icon: "warning"
          })
        return false
      }



        const cvv = document.querySelector(".inputCvv").value
        const expresionCvv = /^[0-9]{3}$/
        if (!expresionCvv.test(cvv)) {
          swal({
            text: "Para el el cvv solo se permiten números y tener 3 digitos",
            icon: "warning"
          })
        return false
      }


       const db = getFirestore(firebaseApp)
       const ventasCollection = collection(db, "ventas")
       addDoc(ventasCollection, {
           comprador,
           items: cart,
           total: precioTotal(),
           date: serverTimestamp()
       })
       .then((res) => {
           setOrderId(res.id)
           vaciarCart()
       })
       .catch((error) => console.error(error))    
    }

  return (
    <>
    {
        !orderId ?
        <div>
        <Layout />
        <div className={style.mainscreen}>
      <div className={style.card}>
        <div className={style.leftside}>
          <img
            src="https://i.pinimg.com/originals/18/9d/dc/189ddc1221d9c1c779dda4ad37a35fa1.png"
            className={style.product}
            alt="Shoes"
          />
        </div>
        <div className={style.rightside}>
          <form onSubmit={finalizarCompra} action="">
            <h1>CheckOut</h1>
            <h2>Información de pago</h2>
            <p>Nombre del titular</p>
            <input className='inputNombre'
              type="text" 
              name="nombre"
              required
              onChange={datosComprador}
            />


          <p>Email</p>
          <input 
              type="email" 
              name="email" 
              required 
              onChange={datosComprador} 
          /> 
          
          
          <p>Telefono</p>
          <input className='inputTel'
              type="tel"
              name="telefono"
              onChange={datosComprador}
              required
          />   
          

            <p>Número de la tarjeta</p>
            <input className='inputCard'
              type="text"
              name="cardNumber"
              required 
              onChange={datosComprador}
            />
           

            <p>Tipo de tarjeta</p>
            <select className={style.inputbox} name="card_type" id="card_type" required>
              <option value="">--Seleccione un tipo de tarjeta--</option>
              <option value="Visa">Visa</option>
              <option value="MasterCard">MasterCard</option>
            </select>
            <div className={style.expcvv}>

            <p className={style.expcvv_text}>Caducidad</p>
            <input 
              type="date" 
              className={style.inputbox} 
              name="exp_date" 
              id="exp_date" 
              required 
            />

            <p class={style.expcvv_text2}>CVV</p>
            <input className='inputCvv'
              type="password"
              name="cvv"
              required
              onChange={datosComprador}
            />
           
          

              
        </div>
            <p></p>
            <button type="submit" className={style.button}>CheckOut</button>
          </form>
        </div>
      </div>
    </div>
      </div>

    :
      <div className={style.cajaTextoCompra}>
        <p className={style.parrafocompra1}>Muchas gracias por tu compra. Te enviaremos un correo cuando tu pedido salga de nuestro almacén.</p>
        <p className={style.parrafocompra2}>Tu código de referencia es: <strong className={style.strongId}>{orderId}</strong></p>
        <Link href={`/`}><a><button className={style.btnAceptar}>Aceptar</button></a></Link> 
      </div>

      
    }
    </>
    
  )
}

//export default Checkout   
export default withAuth(Checkout)