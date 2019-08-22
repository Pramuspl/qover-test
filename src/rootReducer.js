import { combineReducers } from 'redux';
import authReducer from './Helpers/Auth/auth.reducer';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  auth: authReducer,
});

export default rootReducer;
