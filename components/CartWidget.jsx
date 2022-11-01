import Link from 'next/link';
import { useContext } from 'react';
import { BsCart4 } from 'react-icons/bs';
import { CartContext } from '../context/CartContext';
import styles from '../styles/Navbar.module.css' 

function CartWidget() {


  const { cartQuantity } = useContext(CartContext)

  return (
   
      <div className={styles.carrito}>
        <Link href="/cart">
          <BsCart4 className={styles.cart}/>
        </Link>
  
        <Link href="/cart">
          <span>{ cartQuantity() }</span>
        </Link>
        
      </div>
    
        
    
  )
}

export default CartWidget


    