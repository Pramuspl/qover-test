import { combineReducers } from 'redux';
import authReducer from './Helpers/Auth/auth.reducer';
import insuranceReducer from './Helpers/Insurance/insurance.reducer';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  auth: authReducer,
  insurance: insuranceReducer
});

export default rootReducer;
