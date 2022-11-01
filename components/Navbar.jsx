import Link from 'next/link'
import Image from 'next/image'
import Logo from '../public/img/logo.jpg'
import style from '../styles/Navbar.module.css'
import CartWidget from './CartWidget'
import { useRouter } from 'next/router'



function Navbar() {

  const route = useRouter()
  
  return (
    <div>
      
        <header className={style.header}>
          <div className={style.logo}>
            <Link href="/">
                <Image src={Logo} alt="Logo de la empressa" height={83} width={100} className={style.img}/>
            </Link>
            
            <Link href="/">
                <h2 className={style.nombreEmpresa}>Worm Sports</h2>
            </Link>
           </div>
         
           
        
        <nav className={style.nav}>
            <ul>
                <li>
                  <Link href="/marca/adidas"><a>Adidas</a></Link>
                </li>
                <li>
                  <Link href="/marca/nike"><a>Nike</a></Link>
                </li>
                <li>
                  <Link href="/marca/new-balance"><a>New Balance</a></Link>
                </li>
              </ul>
        </nav>
       <CartWidget />
      </header> 
    </div>
  )
}

export default Navbar