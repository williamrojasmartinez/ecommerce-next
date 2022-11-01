import firebaseApp from '../firebase'
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc, where, query} from 'firebase/firestore'
import { useRouter } from 'next/router'
import Item from '../components/Item'
import Layout from '../components/Layout'
import style from '../styles/ItemList.module.css'
import Head from 'next/head'


export default function Home( { productos } ) {

  const router = useRouter()
  
  return (
      <Layout>
        <Head>
          <title>Inicio</title>
          <meta name="description" content="Generando El inicio" />
          <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={style.title}>Worm Sports</h1>

      <p className={style.texto}>En Worm Sports encontraras solo zapatillas originales, con estilos exclusivos para toda la familia, con un rango de tallas y estilos lo suficientemente amplio para cubrir todas tus necesidades, ademas de la gran gama de colores que puedas imaginarte. Entra en nuestra tienda virtual y haz tu compra. Recuerda que tenemos retro clásicos en varias marcas.¡Entra ya y compra! Envíos a todo el país. Respaldo y garantía. Productos originales. Pagos contra entrega.</p>
      
      <h2 className={style.subtituloH2}>PROMOCIONES</h2>
      <h3 className={style.subtituloH3}>¡Aprovecha estos estilos a mitad de precio por pocos días!</h3>

      

      <section className={style.contenedorTenisAdidas}>
          {
            productos.map((item, index) => (
              <Item
                key={index}
                titulo={item.titulo}
                image={item.image}
                precio={item.precio} 
                boton={<button className={style.boton} onClick={() => router.push(`/detalle/${item.id}`)}>Mas detalles</button>}
              />
            ))  
          }
      </section>
      </Layout>
  )
 
}


export const getServerSideProps = async(context)=>{

  const db = getFirestore(firebaseApp)
  const q = query(collection(db, "productos"), where("precio", "<=", "60")) 
 
  const docs = []
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
  docs.push({...doc.data(), id: doc.id})
  console.log(doc.id, " => ", doc.data());
});
                

  return {
    props:{
      productos: docs
    }
  }
}


























//TRAER TODOS LOS PRODUCTOS DE FIREBASE:
// export const getServerSideProps = async(context)=>{

//   const db = getFirestore(firebaseApp)
//   const querySnapshot = await getDocs(collection(db,'productos'))
   
//                 const docs = []
//                 querySnapshot.forEach((doc)=>{
//                     docs.push({...doc.data(), id: doc.id})
//                 })

//   return {
//     props:{
//       productos: docs
//     }
//   }
// }