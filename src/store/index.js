import { configureStore } from '@reduxjs/toolkit';
import notesSlice from './notes-slice';
import userSlice from './user-slice';
import themeSlice from './theme-slice';

export const store = configureStore({
  reducer: {
    notes: notesSlice.reducer,
    user: userSlice.reducer,
    theme: themeSlice.reducer,
  },
});

export default store;
