import { createSlice } from '@reduxjs/toolkit';
export const languages = { ARABIC: 'ARABIC', ENGLISH: 'ENGLISH' };
export const modes = { LIGHT: 'LIGHT', DARK: 'DARK' };

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    language: localStorage.getItem('language') ?? languages.ENGLISH,
    mode: localStorage.getItem('mode') ?? modes.LIGHT,
  },
  reducers: {
    toggleLanguage: (state) => {
      state.language =
        state.language === languages.ARABIC
          ? languages.ENGLISH
          : languages.ARABIC;
      localStorage.setItem('language', state.language);
    },
    toggleMode: (state) => {
      state.mode = state.mode === modes.LIGHT ? modes.DARK : modes.LIGHT;
      localStorage.setItem('mode', state.mode);
    },
    reset: (state) => {
      state.language = languages.ENGLISH;
      state.mode = modes.LIGHT;
    },
  },
});

export const { toggleLanguage, toggleMode, reset } = themeSlice.actions;
export default themeSlice;
