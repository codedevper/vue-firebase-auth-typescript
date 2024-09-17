// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCi42lzb4uHdLd0O3JiiaM8WCEkD_wh1gA',
  authDomain: 'codedevper.firebaseapp.com',
  databaseURL: 'https://codedevper-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'codedevper',
  storageBucket: 'codedevper.appspot.com',
  messagingSenderId: '255293210137',
  appId: '1:255293210137:web:5e43fa76caa3ea707b3488'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth: any = getAuth(app);
const database = getDatabase(app);

export { auth, database };
