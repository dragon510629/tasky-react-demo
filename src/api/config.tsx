import axios from "axios";
import { store } from '../redux/store/store';

const httpClient = axios.create({
  baseURL: 'http://localhost:3000/api/v0/'
});

httpClient.interceptors.request.use(
  function(config) {
    const state = store.getState();
      return {
        ...config,
        headers: {
          auth: state.main.token
        }
      };
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export { httpClient };