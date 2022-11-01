import firebaseApp from '../../firebase'
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc, query, where} from 'firebase/firestore'
import { useRouter } from 'next/router'
import Item from '../../components/Item';
import style from '../../styles/ItemList.module.css'
import Layout from '../../components/Layout';
import Head from 'next/head';

function Marca( { productos } ) {

  const router = useRouter();

  const {query: { marca },} = router;//leer la marca

  return (
    <Layout>
      <Head>
          <title>Worm Sports | {marca}</title> 
          <meta name="description" content={`Contenido de tenis ${marca}`} />
          <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={style.title}> {marca.toUpperCase()} </h1>

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

export default Marca


export const getServerSideProps = async({query: {marca}})=>{

  const db = getFirestore(firebaseApp)
  const q = query(collection(db, "productos"), where("marca", "==", marca)) 
 
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
