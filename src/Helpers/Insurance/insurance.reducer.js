const defaultState = {
  global: 0,
  universal: 0
};

const insuranceReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_INSURANCE_VALUES':
      return {
        ...state,
        global: action.insuranceValues.global,
        universal: action.insuranceValues.universal
      };
    default:
      return state;
  }
};

export default insuranceReducer;