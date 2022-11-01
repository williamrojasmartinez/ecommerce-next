import style from '../styles/ItemList.module.css'

function Item({ id, marca, titulo, image, precio, boton}) {
  return (
    <div className={style.cardAdidas}>
    {id}
    {marca}
    {titulo}
    <img src={image} alt='Tenis'/>
    {`$ ${precio}.00 `}
    {boton} 
  </div>
  )
}

export default Item
