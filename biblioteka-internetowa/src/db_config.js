const firebaseConfig = {
    apiKey: "AIzaSyCJbEWGoZLrKg9xFeH0RaTlBdre5K7yp-M",
    authDomain: "biblioteka-internetowa.firebaseapp.com",
    projectId: "biblioteka-internetowa",
    storageBucket: "biblioteka-internetowa.appspot.com",
    messagingSenderId: "259752503546",
    appId: "1:259752503546:web:888e959662e4dbd5044143",
    measurementId: "G-2NQPM7PP0B"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();