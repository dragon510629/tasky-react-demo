import * as types from '../constants/workspace';

const initialState = {
  listWorkspace : [],
  workspaceSelected: {},
};

const reducer = (state = initialState, action : any) => {
  switch (action.type){
    case types.SAVE_LIST :
      return {
        ...state,
        listWorkspace : action.data,
      }
    case types.SET_SELECTED_WORKSPACE :
      return {
        ...state,
        workspaceSelected : action.data,
      }
    default:
      return state;
  }
}

export default reducer;



