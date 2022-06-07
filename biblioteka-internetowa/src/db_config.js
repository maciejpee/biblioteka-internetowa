
const firebaseConfig = {
    apiKey: "AIzaSyCJbEWGoZLrKg9xFeH0RaTlBdre5K7yp-M",
    authDomain: "biblioteka-internetowa.firebaseapp.com",
    projectId: "biblioteka-internetowa",
    storageBucket: "biblioteka-internetowa.appspot.com",
    messagingSenderId: "259752503546",
    appId: "1:259752503546:web:888e959662e4dbd5044143",
    measurementId: "G-2NQPM7PP0B"
  };


const firebaseConfig2 = {
  apiKey: "AIzaSyDOUi5NX9Q1WaKwIpne0pS3a86rreiShdg",
  authDomain: "biblioteka-internetowa-awaria.firebaseapp.com",
  projectId: "biblioteka-internetowa-awaria",
  storageBucket: "biblioteka-internetowa-awaria.appspot.com",
  messagingSenderId: "1077684950551",
  appId: "1:1077684950551:web:88c82e462f15dd6fd66e52"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig2);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();