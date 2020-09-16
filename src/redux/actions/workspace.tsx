import * as types from '../constants/workspace';

export const saveListWorkspace = (data : []) => ({
  type: types.SAVE_LIST,
  data
});