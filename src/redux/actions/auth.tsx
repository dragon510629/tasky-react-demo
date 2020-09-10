import * as types from '../constants/auth';

export const saveAuth = (key : string) => ({
  type: types.SAVE_AUTH,
  key
});

export const saveUser = (data : any) => ({
  type: types.SAVE_USER,
  data
});