import Link from 'next/link'
import React from 'react'
import style from '../styles/Navbar.module.css'

function Botones() {
  return (
    <div className={style.contenedorUl}>
      <ul>
          <li >
            <Link href={"/login"}>
              <button className={style.buttonLogin}>Login</button>
            </Link>
          </li>
          <li>
            <Link href={"/crear-cuenta"}>
              <button className={style.buttonCrearCuenta}>Crear cuenta</button>
            </Link>
          </li>
        </ul>
    </div>
  )
}

export default Botones
