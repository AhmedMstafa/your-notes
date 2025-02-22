import { configureStore } from '@reduxjs/toolkit';
import notesSlice from './notes-slice';

export const store = configureStore({
  reducer: { notes: notesSlice.reducer },
});

export default store;
