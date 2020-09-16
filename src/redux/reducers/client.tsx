import * as types from '../constants/client';

const initialState = {
  allClient: [],
};

const reducer = (state = initialState, action : any) => {
  switch (action.type){
    case types.SAVE_ALL_CLIENT :
      return {
        ...state,
        allClient : action.data,
      }
    default:
      return state;
  }
}

export default reducer;



