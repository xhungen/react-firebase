
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDa_pGw5rWeUTlo4VBjzpZahWXNvSh9DVk",
  authDomain: "react-firebase-86cae.firebaseapp.com",
  projectId: "react-firebase-86cae",
  storageBucket: "react-firebase-86cae.appspot.com",
  messagingSenderId: "977762991649",
  appId: "1:977762991649:web:ad74fd43b55de26cda6d60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export {auth};
