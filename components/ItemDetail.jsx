import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext';
import ItemCount from './ItemCount';
import style from '../styles/ItemDetail.module.css'
import swal from 'sweetalert';



function ItemDetail({id, titulo, image, descripcion, stock, precio }) {

    const { addToCart } = useContext(CartContext)

    const onAdd = (cantidad) => {
        
        const elementoActivo = document.querySelector('input[name="talla"]:checked')
    
        if(elementoActivo){
          document.getElementById("agregar").style.display = "none";
          console.log(`Agregaste ${cantidad} al carrito`)
          console.log(`Talla: ${elementoActivo.value}`)
    
          const itemAComprar = {
            id,
            titulo,
            image,
            precio,
            tallas: [elementoActivo.value],
            cantidad
          }
            
          addToCart(itemAComprar)
        
        } else {
            swal({
              text: "SELECCIONA UNA TALLA POR FAVOR",
              icon: "error"
            })
        }
       
        
      }

  return (
    
    <div className={style.tarjetas}>
                <div className={style.card}>

                    <div className={style.imgBox}>
                        <img src={image} alt="Imagen teni deportivo"/>
                    </div>

                        <div className={style.details}>
                            
                            <div className={style.titulo}>
                             {titulo}
                            </div>
                            
                            <div className={style.descripcion}>
                            {descripcion}
                            </div>

                            <div className='talla'>
                                        
                                        <p>Tallas:</p>

                                        <ul>
                                        
                                        <li>
                                            <input type="radio" name="talla" value='6.5' /> 6.5 
                                        </li>


                                        <li>
                                            <input type="radio" name="talla" value='7' /> 7 
                                        </li>


                                        <li>
                                            <input type="radio" name="talla" value='7.5' /> 7.5 
                                        </li>


                                        <li>
                                            <input type="radio" name="talla" value='8' /> 8 
                                        </li>


                                        <li>
                                            <input type="radio" name="talla" value='8.5' /> 8.5 
                                        </li>


                                        <li>
                                            <input type="radio" name="talla" value='9' /> 9 
                                        </li>


                                        <li>
                                            <input type="radio" name="talla" value='9.5' /> 9.5 
                                        </li>


                                        <li>
                                            <input type="radio" name="talla" value='10' /> 10 
                                        </li>     
                                        
                                        </ul>
                            </div>

                            <div className={style.precio}>
                            {`$ ${precio}.00 `}
                            </div>

                            
                            <div>
                            <ItemCount
                            stock={stock}
                            initial={1}
                            onAdd={onAdd}
                            /> 
                            </div>
                        
                        </div>
            
                </div>

            </div>
            
  )
}

export default ItemDetail
