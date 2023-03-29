import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // apiKey: 'AIzaSyA7pJtwOmWLQoM2rrclvsIth3sg7FK_C-0',
  // authDomain: 'dictionary-app-4e6ca.firebaseapp.com',
  // projectId: 'dictionary-app-4e6ca',
  // storageBucket: 'dictionary-app-4e6ca.appspot.com',
  // messagingSenderId: '455783557318',
  // appId: '1:455783557318:web:36f4fee3a5a30b22f3cfc7',
  // measurementId: 'G-KQ23MRD4XC'
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);

export {
  auth,
  // app,
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  firestore
};
