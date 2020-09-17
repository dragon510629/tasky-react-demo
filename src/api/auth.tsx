import { AxiosResponse } from 'axios';
import { LoginRequest } from '../models/AuthRequest';
import { httpClient } from './config';


export const login = (data : LoginRequest ): Promise<AxiosResponse> => httpClient.post('auth/login', data);