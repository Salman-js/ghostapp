import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
import env from './env';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Google Sign-In
// GoogleSignin.configure({
//   webClientId:
//     '999979045686-22da5n68itc19mll3ipo4dbm9pcd6bnc.apps.googleusercontent.com',
// });

export const auth = getAuth();
export const db = getFirestore(app);
