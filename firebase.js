import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBNpULC2CMI-UgE-zJ6YdnnafO42ffTFGE",
  authDomain: "ecommerce-worm.firebaseapp.com",
  projectId: "ecommerce-worm",
  storageBucket: "ecommerce-worm.appspot.com",
  messagingSenderId: "700793274965",
  appId: "1:700793274965:web:0ef0c0b5d1d86d14e14adc"
};

const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;

export const auth = getAuth(firebaseApp);
 













