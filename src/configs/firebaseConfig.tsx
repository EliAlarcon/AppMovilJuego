// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeKy7SvgkLizsgmLIdMoWYJVEGdAnTJnY",
  authDomain: "app-movil-juego.firebaseapp.com",
  projectId: "app-movil-juego",
  storageBucket: "app-movil-juego.appspot.com",
  messagingSenderId: "555944797030",
  appId: "1:555944797030:web:a42e164677e70848b95ea7",
  databaseUrl: "https://app-movil-juego-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
//Constante para obtener servicio de autenticación
export const auth = initializeAuth(firebase, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

auth.languageCode = 'it';

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storageRef = getStorage();

// Initialize Realtime Database and get a reference to the service
export const dbRealTime = getDatabase(firebase);