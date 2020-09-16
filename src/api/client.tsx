import { AxiosResponse } from 'axios';
import { httpClient } from './config';

export const getListClient = (): Promise<AxiosResponse> => httpClient.get('client')