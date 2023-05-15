import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCNxPaGioEsY_NGmJ7d5P0rPN6G5ndeR50',
  authDomain: 'rite-125da.firebaseapp.com',
  projectId: 'rite-125da',
  storageBucket: 'rite-125da.appspot.com',
  messagingSenderId: '999979045686',
  appId: '1:999979045686:web:f66e273337567b6f035997',
  measurementId: 'G-4QS44VEHVP',
};

const app = initializeApp(firebaseConfig);

// const db = firebase.firestore();
export const auth = getAuth();
export const db = getFirestore(app);
