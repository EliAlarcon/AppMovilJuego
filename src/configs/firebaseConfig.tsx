// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeKy7SvgkLizsgmLIdMoWYJVEGdAnTJnY",
  authDomain: "app-movil-juego.firebaseapp.com",
  projectId: "app-movil-juego",
  storageBucket: "app-movil-juego.appspot.com",
  messagingSenderId: "555944797030",
  appId: "1:555944797030:web:a42e164677e70848b95ea7"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
//Constante para obtener servicio de autenticación
export const auth = initializeAuth(firebase, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

auth.languageCode = 'it';

