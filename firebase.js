import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import env from './env';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
console.log(env.API_KEY);
const firebaseConfig = {
  apiKey: env.API_KEY,
  authDomain: env.AUTH_DOMAIN,
  projectId: env.PROJECT_ID,
  storageBucket: env.STORAGE_BUCKET,
  messagingSenderId: env.MESSAGING_SENDER_ID,
  appId: env.APP_ID,
  measurementId: env.MEASURMENT_ID,
};

const app = initializeApp(firebaseConfig);

// const db = firebase.firestore();
export const auth = getAuth();
export const db = getFirestore(app);
