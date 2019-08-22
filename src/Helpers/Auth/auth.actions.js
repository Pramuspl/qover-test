import { firebaseAuth } from '../FirebaseInterface';
// import { gtagHelper } from '../../../../Helpers/gtag.helper';

export const loginAction = credentials => {
  return (dispatch) => {
    firebaseAuth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(data => {
        dispatch({ type: 'LOGIN_SUCCESS' });
        return data;
      })
      .catch(err => {
        dispatch({ type: 'LOGIN_ERROR', err });
      });
  };
};

export const logoutAction = () => {
  return (dispatch) => {
    firebaseAuth.signOut().then(() => {
      dispatch({ type: 'LOGOUT_SUCCESS' });
    });
  };
};

