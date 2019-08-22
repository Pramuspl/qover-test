// Firebase config
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAsy4tvvnxS36HAnbGIi4n5CW8RuYrfBDQ",
  authDomain: "qover-test-51367.firebaseapp.com",
  databaseURL: "https://qover-test-51367.firebaseio.com",
  projectId: "qover-test-51367",
  storageBucket: "",
  messagingSenderId: "1021968369860",
  appId: "1:1021968369860:web:c61a61bdb2797379"
};
export const app = firebase.initializeApp(firebaseConfig);

export const firebaseAuth = app && app.auth && app.auth();
export const firebaseStorage = app && app.storage && app.storage();
export const firebaseRealDb = app && app.database && app.database();
export const firebaseFunctions = app && app.functions && app.functions('europe-west1');
