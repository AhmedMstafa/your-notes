import { createSlice } from '@reduxjs/toolkit';
export const languages = { ARABIC: 'ARABIC', ENGLISH: 'ENGLISH' };

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    language: localStorage.getItem('language') ?? languages.ARABIC,
  },
  reducers: {
    toggleLanguage: (state) => {
      state.language =
        state.language === languages.ARABIC
          ? languages.ENGLISH
          : languages.ARABIC;
      localStorage.setItem('language', state.language);
    },
  },
});

export const { toggleLanguage } = themeSlice.actions;
export default themeSlice;
