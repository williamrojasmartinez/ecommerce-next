import AuthProvider from "../context/Auth"
import CartProvider from "../context/CartContext"




function MyApp({ Component, pageProps }) {

  return (
    <AuthProvider>
        <CartProvider>
            <Component {...pageProps} />
        </CartProvider>
    </AuthProvider>
    
    )
}

export default MyApp
