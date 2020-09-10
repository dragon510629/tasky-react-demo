import httpClient, { AxiosResponse, Method } from 'axios';
import { LoginRequest } from '../models/AuthRequest'

const api = 'http://localhost:3000/api/v0/'

export const login = (data : LoginRequest ): Promise<AxiosResponse> => httpClient.post(`${api}auth/login`, data);