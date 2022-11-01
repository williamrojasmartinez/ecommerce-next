import { useState } from 'react'
import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs';
import style from '../styles/ItemCount.module.css'


function ItemCount( { stock, initial, onAdd } ) {

    const [count, setCount] = useState(initial)

    const disminuir = () => {
        count > initial && setCount(count - 1)
      }
      
      const aumentar = () => {
        count < stock && setCount(count + 1)
      }

  return (
    <>
    <div className={style.contador}>
        <button className="btn-disminuir" onClick={disminuir}><BsFillCaretDownFill /></button>
      
        <span>{count}</span>

        <button className="btn-aumentar" onClick={aumentar}><BsFillCaretUpFill /></button>
      
        <div className={style.textoYBoton}>
            <h6 className={style.h6}>{`Quedan ${stock} unidades`}</h6>
            
             <button className={style.btnAgregar} id='agregar' onClick={() => onAdd(count)}>Agregar al Carrito</button>
        </div>

    </div>
    
    </>
  )
}

export default ItemCount
