import { configureStore } from '@reduxjs/toolkit';
import notesSlice from './notes-slice';
import userSlice from './user-slice';

export const store = configureStore({
  reducer: { notes: notesSlice.reducer, user: userSlice.reducer },
});

export default store;
