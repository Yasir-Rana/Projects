import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBgRCig8UoCPlNrOYQCLmPP1F0OL4JMqsg",
  authDomain: "store-images-e992d.firebaseapp.com",
  projectId: "store-images-e992d",
  storageBucket: "store-images-e992d.appspot.com",
  messagingSenderId: "993395645014",
  appId: "1:993395645014:web:333a65a178bfb31d93b9f7",
};

firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
