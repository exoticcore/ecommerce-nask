import { AsyncThunk } from '@reduxjs/toolkit';
import { GetThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import axios, {
  AxiosRequestHeaders,
  CreateAxiosDefaults,
  AxiosHeaders,
  RawAxiosRequestHeaders,
} from 'axios';
import { RootState } from '../store';

const endpointAPI = 'http://localhost:3000';

export const authFetch = axios.create({
  baseURL: `${endpointAPI}/api/v1/auth/admin`,
  withCredentials: true,
});

export const authHeader = (thunkApi): RawAxiosRequestHeaders | AxiosHeaders => {
  const state = <RootState>thunkApi.getState();
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${state.user.accessToken}`,
  };
};
