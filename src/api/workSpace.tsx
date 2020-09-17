import { AxiosResponse } from 'axios';
import { httpClient } from './config';

interface CreateWorkspaceRequest {
  name: string;
  clientId: number;
}


export const getListWorkSpace = (): Promise<AxiosResponse> => httpClient.get('workspace')

export const workSpaceDetailAPI = (id : number): Promise<AxiosResponse> => httpClient.get(`workspace/${id}`)

export const createWorkspaceApi = (data: CreateWorkspaceRequest): Promise<AxiosResponse> => httpClient.post(`workspace/`,data);

export const deleteWorkspaceApi = (id : number): Promise<AxiosResponse> => httpClient.delete(`workspace/${id}`)
