import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider,  } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAiFtrasiapUf_Cc_285lsPR3Syzs7b3Zo",
    authDomain: "gen-lang-client-0105403588.firebaseapp.com",
    projectId: "gen-lang-client-0105403588",
    storageBucket: "gen-lang-client-0105403588.firebasestorage.app",
    messagingSenderId: "921724482676",
    appId: "1:921724482676:web:5b4c14cffbbb0b9aec4d21",
    measurementId: "G-D62Q10BXKH"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const githubProvider = new GithubAuthProvider();