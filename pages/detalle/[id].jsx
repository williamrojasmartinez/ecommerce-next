import firebaseApp from '../../firebase'
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc} from 'firebase/firestore'
import Layout from '../../components/Layout'
import ItemDetail from '../../components/ItemDetail';
import { Router, useRouter } from 'next/router';
const db = getFirestore(firebaseApp)

function DetalleProducto({producto}) {
 const router = useRouter()

  const {query: { id },} = router; //para leer el id

  
    
  return(
    <Layout>
           { 
             <ItemDetail
              id={id}
              titulo={producto.titulo}
              descripcion={producto.descripcion}
              stock={producto.stock}
              image={producto.image}
              precio={producto.precio}
              tallas={producto.tallas}
            />  
           }  

    </Layout>
  )
}

export default DetalleProducto


export async function getServerSideProps({query: {id}}){
    const docRef = doc(db, 'productos', id)
    const docSnap = await getDoc(docRef)
    const producto = docSnap.data()


    return{
        props:{
            producto,
        }
    }
}
