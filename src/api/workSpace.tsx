import httpClient, { AxiosResponse, Method } from 'axios';
import { store } from '../redux/store/store';

const api = 'http://localhost:3000/api/v0/';

export const getListWorkSpace = (): Promise<AxiosResponse> => {
  const state = store.getState();
  return httpClient.get(`${api}workspace`, {
    headers : {
      'auth' : state.main.token,
    }
  })
};