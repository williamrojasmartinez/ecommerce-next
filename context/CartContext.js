import React, { useState } from 'react'
import { createContext } from "react";


export const CartContext = createContext()


function CartProvider(props) {
    
    const [cart, setCart] = useState([])


const addToCart = (item) => {
    const itemInCart = cart.find((prod) => prod.id === item.id)
    if (itemInCart) {
        const updateCart = cart.map((prod) => {
            if (prod.id === item.id) {
                return { ...prod, cantidad: prod.cantidad + item.cantidad }
            } else {
                return prod
            }
        })
        setCart(updateCart)
    } else {
         setCart([...cart, item]) 
    }

}

const isInCart = (id) => {
    return cart.some((prod) => prod.id === id)
}


const vaciarCart = () => {
    setCart([])
}


const removeOneItem = (id) => {
    setCart(cart.filter((prod) => prod.id !== id))

}


const cartQuantity = () => {
    return cart.reduce((acumulador, prod) => acumulador += prod.cantidad, 0)
}


const precioTotal = () => {
    return cart.reduce((acumulador, prod) => acumulador += prod.precio * prod.cantidad, 0)
}


  return (
    <CartContext.Provider value={{cart, addToCart, isInCart, vaciarCart, removeOneItem, cartQuantity, precioTotal}}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider
