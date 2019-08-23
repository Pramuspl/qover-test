// Firebase config
import firebase from 'firebase';
import { firebaseConfig } from './firebaseConfig'

export const app = firebase.initializeApp(firebaseConfig);

export const firebaseAuth = app && app.auth && app.auth();
export const firebaseFunctions = app && app.functions && app.functions('europe-west1');
