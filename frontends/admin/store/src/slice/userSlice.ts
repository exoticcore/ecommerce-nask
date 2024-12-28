import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { RootState } from '../store';
import axios, { AxiosError } from 'axios';
import { authFetch } from '../utils/axios';
// @ts-ignore
import { AUTH_API } from 'container/Config';

interface Login {
  email: string;
  password: string;
  remember_me?: boolean;
}

export const login = createAsyncThunk(
  'user/login',
  async (data: Login, thunkApi) => {
    try {
      const resp = await axios.post(
        `${AUTH_API}/admin/login`,
        { email: data.email, password: data.password },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const state = thunkApi.getState() as RootState;
      state.user.user;
      // const token = await thunkApi.dispatch(getAccessToken());
      // await thunkApi.dispatch(getUserInfo(token.payload));
      await thunkApi.dispatch(getUserInfo());
      return thunkApi.fulfillWithValue(resp.data?.accessToken);
    } catch (err) {
      if (err instanceof AxiosError) {
        return thunkApi.rejectWithValue(err.response?.data.message);
      }
    }
  }
);

export const getAccessToken = createAsyncThunk(
  'user/getAccessToken',
  async (_, thunkApi) => {
    try {
      const resp = await axios.get(`${AUTH_API}/admin/token`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return thunkApi.fulfillWithValue(resp.data.accessToken);
    } catch (err) {
      if (err instanceof AxiosError) {
        return thunkApi.rejectWithValue(err.response?.data.message);
      }
    }
  }
);

export const getUserInfo = createAsyncThunk(
  'user/info',
  async (accessToken: string | undefined, thunkApi) => {
    try {
      const token = await thunkApi.dispatch(getAccessToken());
      const resp = await axios.get(`${AUTH_API}/admin/info`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token.payload}`,
        },
      });
      if (resp.status !== 200) return thunkApi.rejectWithValue('');

      const roles = resp.data.roles;
      const name = resp.data.given_name;

      if (!roles) {
        return thunkApi.rejectWithValue('');
      }

      return thunkApi.fulfillWithValue(resp.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        return thunkApi.rejectWithValue(err.response?.data.message);
      }
    }
  }
);

export const logout = createAsyncThunk('user/logout', async (_, thunkApi) => {
  try {
    const resp = await axios.delete(`${AUTH_API}/admin/logout`, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    if (resp.status !== 204) return thunkApi.rejectWithValue('');

    return thunkApi.fulfillWithValue(true);
  } catch (err) {
    if (err instanceof AxiosError) {
      return thunkApi.rejectWithValue(err.response?.data.message);
    }
  }
});

export interface UserState {
  isLoading: boolean;
  user: {
    isSignedIn: boolean;
    name: string;
    roles?: string[];
    image_url?: string | null;
  };
  navigate: string | null;
  accessToken: string;
  error: string | null;
}

const userInfo = JSON.parse(<string>localStorage.getItem('userInfo'));

const initialState: UserState = {
  isLoading: false,
  accessToken: userInfo?.accessToken || '',
  user: {
    isSignedIn: userInfo?.isSignedIn || false,
    name: userInfo?.name || '',
    roles: userInfo?.roles || [],
    image_url: userInfo?.image_url || '',
  },
  navigate: null,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {},
    setNavigate: (state, { payload }) => {
      state.navigate = payload;
    },
    clearNavigate: (state) => {
      state.navigate = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user.isSignedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = <string>action.payload || '';
      })
      .addCase(getAccessToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.isSignedIn = true;
        state.accessToken = action.payload;
      })
      .addCase(getAccessToken.rejected, (state, action) => {
        state.isLoading = false;
        state.user.isSignedIn = false;
        state.accessToken = '';
        state.error = <string>action.payload;
        localStorage.removeItem('userInfo');
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.user.name = action.payload.first_name || 'Test Admin';
        state.user.roles = action.payload.roles;
        localStorage.setItem(
          'userInfo',
          JSON.stringify({
            isSignedIn: true,
            name: action.payload.first_name,
            roles: action.payload.roles,
          })
        );
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.user.isSignedIn = false;
        state.accessToken = '';
        state.user.name = '';
        state.user.roles = [];
        localStorage.removeItem('userInfo');
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user.isSignedIn = false;
        state.accessToken = '';
        state.user.name = '';
        state.user.roles = [];
        localStorage.removeItem('userInfo');
      });
  },
});

export const { setUser, setNavigate, clearNavigate } = userSlice.actions;

export default userSlice.reducer;
