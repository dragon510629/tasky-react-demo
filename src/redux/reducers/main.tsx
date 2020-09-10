import * as types from '../constants/auth';
const initialState = {
  token : '123',
  user : {
    email: '',
    firstName: '',
    id: 0,
    lastName: '',
    role: 0,
  }
};

const reducer = (state = initialState, action : any) => {
  switch (action.type){
    case types.SAVE_AUTH :
      return {
        ...state,
        token : action.key
      }
    case types.SAVE_USER :
      return {
        ...state,
        user : {
          email: action.data.email,
          firstName: action.data.firstName,
          id: action.data.id,
          lastName: action.data.lastName,
          role: action.data.role,
        }
      }
    default:
      return state;
  }
}

export default reducer;



