import { compose, createStore } from 'redux';
import { reactReduxFirebase } from 'react-redux-firebase';
import firebase from 'firebase';


// react-redux-firebase options
const config = {
  userProfile: 'users', // firebase root where user profiles are stored
  enableLogging: false, // enable/disable Firebase's database logging
  useFirestoreForProfile: true,
  attachAuthIsReady: true
};

// Add redux Firebase to compose
export const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, config)
)(createStore);