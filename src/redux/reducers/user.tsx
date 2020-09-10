import * as types from '../constants/auth';
import { UserInfo } from '../../models/AuthRequest';
const initialState = {
  email: '',
  firstName: '',
  id: 0,
  lastName: '',
  role: 0,
};

const reducer = (state: UserInfo = initialState, action : any) => {
  switch (action.type){
    case types.SAVE_USER :
      debugger;
      return {
        ...state,
        email: action.user.email,
        firstName: action.user.firstName,
        id: action.user.id,
        lastName: action.user.lastName,
        role: action.user.role,
      }
    default:
      return state;
  }
}

export default reducer;



