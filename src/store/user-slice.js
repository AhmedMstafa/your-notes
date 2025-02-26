import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuthToken } from '../util/auth';

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async () => {
    const token = getAuthToken();

    const userResponse = await fetch(
      'https://your-notes.vercel.app/api/users',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const userData = await userResponse.json();

    if (userResponse.code === 401) {
      throw new Response(
        JSON.stringify({ message: 'Your authentication token has expired' }),
        {
          status: 401,
        }
      );
    }

    if (userData.code === 400 || userData.code === 422) {
      return userData;
    }

    if (!userResponse.ok) {
      throw new Response(
        JSON.stringify({ message: 'Could not authenticate user.' }),
        {
          status: 500,
        }
      );
    }

    return userData.data.users[0];
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {
      userName: '',
      email: '',
      phone: '',
      birthdayYear: 0,
    },
  },
  reducers: {
    updateUserInfo: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload.userInfo };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
    });
  },
});

export const { updateUserInfo, resetUserInfo } = userSlice.actions;

export default userSlice;
