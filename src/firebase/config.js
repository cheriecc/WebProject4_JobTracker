// V9
// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';

// V8
// import firebase from 'firebase/app';
// import 'firebase/firestore'

// V7
import app from "firebase/app";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCb7Pff2KDT5YHOzsNKh52FLIonFtGA3f8",
    authDomain: "jobtracker-16e40.firebaseapp.com",
    projectId: "jobtracker-16e40",
    storageBucket: "jobtracker-16e40.appspot.com",
    messagingSenderId: "820586352159",
    appId: "1:820586352159:web:a43933d840c07037f50f2a"
  };

// V9
// const app = initializeApp(firebaseConfig);
// const firestore = getFirestore(app);

// V8
// firebase.initializeApp(firebaseConfig);
// const firestore = firebase.firestore();

// V7
const firebase = app.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export { firebase, firestore, app };


/*
<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAAr2FJdvRhI-Hk_OkCqYp76VuIu8mWr5w",
    authDomain: "jobtacker.firebaseapp.com",
    projectId: "jobtacker",
    storageBucket: "jobtacker.appspot.com",
    messagingSenderId: "725301672857",
    appId: "1:725301672857:web:a4633e7f249467a7e97108"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
</script>





// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAr2FJdvRhI-Hk_OkCqYp76VuIu8mWr5w",
  authDomain: "jobtacker.firebaseapp.com",
  projectId: "jobtacker",
  storageBucket: "jobtacker.appspot.com",
  messagingSenderId: "725301672857",
  appId: "1:725301672857:web:a4633e7f249467a7e97108"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
*/