import * as types from '../constants/workspace';

export const saveListWorkspace = (data : []) => ({
  type: types.SAVE_LIST,
  data
});

export const selectWorkspace = (data : {}) => ({
  type: types.SET_SELECTED_WORKSPACE,
  data
});