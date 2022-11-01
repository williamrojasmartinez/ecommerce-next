import React, { useContext } from 'react'
import Link from 'next/link'
import { CartContext } from '../context/CartContext'
import { BsFillTrashFill } from 'react-icons/bs' 
import { MdOutlineRemoveShoppingCart } from 'react-icons/md'
import style from '../styles/Cart.module.css'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import Botones from '../components/Botones'




function Cart() {
  
  
  

    const router = useRouter();

    //const {query: { marca },} = router;

    const { cart } = useContext(CartContext)
    console.log(cart)
    const { removeOneItem } = useContext(CartContext)
    const { precioTotal } = useContext(CartContext)
    const { vaciarCart } = useContext(CartContext)
    
  return (
    <div className={style.contenedorCarrito}>
        {
            cart <= 0 ?
            <>
            <Layout />
            <div> <MdOutlineRemoveShoppingCart className={style.cartIcon}/> </div>
            <p className={style.parrafoCarrito}>Su carrito de compras se encuentra vacío. Escoge un producto  <strong><Link href='/' className={style.enlaceCarrito}><a><button className={style.btnVolver}>←Volver</button></a></Link>
            </strong></p> 


            
            </>
           :  
           
            cart.map((item, index) => {
                return (
                
                    <Layout>

                        <div className={style.itemProductos} key={index} data={item}>
                    
                            <div className={style.carritoItem}><img src={item.image} alt='producto'/></div>
                            
                            <div className={style.titulo}>{item.titulo}<b className={style.size}>{` (Talla: ${item.tallas})`}</b></div>

                            <div className={style.cantidad}> Qty: <b className={style.precios}>{item.cantidad}</b></div>

                            <div className={style.precioUnitario}>Precio unitario: <b className={style.precios}>{` $ ${item.precio}` }</b></div>

                            <div className={style.subtotal}>Subtotal: <b className={style.precios}>{`$ ${item.precio * item.cantidad}`}</b></div>
                            
                            <div className={style.remove} onClick={() => removeOneItem(item.id) }><BsFillTrashFill className={style.trash}/></div> 
                        </div> 
                           
                    </Layout>
            
                )
            })
        }

    <>
      {
      cart != 0 && 
      <div className={style.carritoFooter}>
        <h3>Total: $ { precioTotal() }</h3> 
       
       <p className={style.precios}>Para finalizar la compras tienes que iniciar sesion y si no tienes cuenta crea una por favor</p>
       <Botones />
        {/* <Link href="/checkout"><a><button className={style.btnComprar}>Finalizar Compra</button></a></Link>  */}

        <div><button className={style.btnLimpiarCarrito} onClick={ vaciarCart }>Limpiar Carrito</button></div>
      </div> 
      
      }
    </>
      
    </div>
  )
}

export default Cart


