const defaultState = {
  errorMessage: null
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      console.log(`Login failed: ${action.error}`);
      return {
        ...state,
        errorMessage: 'Incorrect login or password'
      };
    case 'LOGIN_SUCCESS':
      console.log('Login success!');
      return {
        ...state,
        errorMessage: null
      };
    case 'LOGOUT_SUCCESS':
      console.log('Logout success!');
      return {
        ...state,
        errorMessage: null
      };
    default:
      return state;
  }
};

export default authReducer;