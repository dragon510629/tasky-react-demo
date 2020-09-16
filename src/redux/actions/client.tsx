import * as types from '../constants/client';

export const saveListClients = (data : []) => ({
  type: types.SAVE_ALL_CLIENT,
  data
});