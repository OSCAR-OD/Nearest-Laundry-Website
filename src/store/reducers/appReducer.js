
export const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_APP_SERVICES':
      return {...state, services : action.services};

    case 'SET_REFER_CODE':
      return {...state, refer_code: action.refer_code};

    case 'REMOVE_REFER_CODE':
      localStorage.removeItem("ref");
      return {...state, refer_code: null};
      
    default:
      return state;
  }
} 