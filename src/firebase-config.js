// Importar solo las funciones que necesitas de Firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAxq7aK1R8xqCkF6_NvSxjEjj9baRBTOaM",
  authDomain: "itlacrush-15c8e.firebaseapp.com",
  projectId: "itlacrush-15c8e",
  storageBucket: "itlacrush-15c8e.appspot.com",
  messagingSenderId: "730613789402",
  appId: "1:730613789402:web:b3a8d85889ef9cf8a5519d"
};

// Inicializar Firebase con la configuración
const app = initializeApp(firebaseConfig);

// Inicializar servicios específicos
const auth = getAuth(app); // Autenticación
const firestore = getFirestore(app); // Firestore

// Exportar los servicios para ser utilizados en otros archivos
export { auth, firestore };
