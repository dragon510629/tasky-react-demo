import { AxiosResponse } from 'axios';
import { httpClient } from './config';

export const getListClientAPI = (): Promise<AxiosResponse> => httpClient.get('client')