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
