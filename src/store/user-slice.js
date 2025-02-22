import { createSlice } from '@reduxjs/toolkit';

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
});

export const { updateUserInfo, resetUserInfo } = userSlice.actions;

export default userSlice;
