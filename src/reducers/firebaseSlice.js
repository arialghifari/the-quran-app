import { createSlice } from "@reduxjs/toolkit";

const firebaseSlice = createSlice({
  name: "firebase",
  initialState: {
    bookmarks: [],
    darkmode: false,
    translation: true,
    text_arabic: "Regular",
    text_translation: "Regular",
  },
  reducers: {
    initialize: (state, action) => {
      return {
        bookmarks: action.payload.bookmarks,
        darkmode: action.payload.darkmode,
        translation: action.payload.translation,
        text_arabic: action.payload.text_arabic,
        text_translation: action.payload.text_translation,
      };
    },
    showTranslation: (state) => {
      return { ...state, translation: true };
    },
    hideTranslation: (state) => {
      return { ...state, translation: false };
    },
    updateTextArabic: (state, action) => {
      return { ...state, text_arabic: action.payload };
    },
    updateTextTranslation: (state, action) => {
      return { ...state, text_translation: action.payload };
    },
    addBookmark: (state, action) => {
      const addBookmark = [...state.bookmarks, action.payload];

      return { ...state, bookmarks: addBookmark };
    },
    removeBookmark: (state, action) => {
      const removeBookmark = [...state.bookmarks].filter(
        (item) => item !== action.payload
      );

      return { ...state, bookmarks: removeBookmark };
    },
    setDarkmode: (state) => {
      return { ...state, darkmode: true };
    },
    setLightmode: (state) => {
      return { ...state, darkmode: false };
    },
  },
});

export const selectBookmarks = (state) => state.firebase.bookmarks;
export const selectDarkmode = (state) => state.firebase.darkmode;
export const selectTranslation = (state) => state.firebase.translation;
export const selectTextArabic = (state) => state.firebase.text_arabic;
export const selectTextTranslation = (state) => state.firebase.text_translation;

export const {
  initialize,
  showTranslation,
  hideTranslation,
  updateTextArabic,
  updateTextTranslation,
  addBookmark,
  removeBookmark,
  setDarkmode,
  setLightmode,
} = firebaseSlice.actions;
export default firebaseSlice.reducer;
