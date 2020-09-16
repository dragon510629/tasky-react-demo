import * as types from '../constants/workspace';

const initialState = {
  listWorkspace : [],
};

const reducer = (state = initialState, action : any) => {
  switch (action.type){
    case types.SAVE_LIST :
      return {
        ...state,
        listWorkspace : action.data,
      }
    default:
      return state;
  }
}

export default reducer;



