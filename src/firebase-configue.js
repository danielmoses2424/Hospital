import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// your web app firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "hospital-3d28c.firebaseapp.com",
  projectId: "hospital-3d28c",
  storageBucket: "hospital-3d28c.appspot.com",
  messagingSenderId: "269671098935",
  appId: "1:269671098935:web:aa16167e76aadbc0be6db2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app); // for storing data into firebase
export const db = getFirestore(app)
export const provider = new GoogleAuthProvider(); // signing in with google
export default app