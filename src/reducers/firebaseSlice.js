import { createSlice } from "@reduxjs/toolkit";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

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
    updateTextArabic: (state, action) => {
      updateDoc(doc(db, "users", action.payload.uid), {
        text_arabic: action.payload.value,
      });

      return { ...state, text_arabic: action.payload.value };
    },
    updateTextTranslation: (state, action) => {
      updateDoc(doc(db, "users", action.payload.uid), {
        text_translation: action.payload.value,
      });

      return { ...state, text_translation: action.payload.value };
    },
    addBookmark: (state, action) => {
      const addBookmark = [...state.bookmarks, action.payload.verse_key];

      updateDoc(doc(db, "users", action.payload.uid), {
        bookmarks: addBookmark,
      });

      return { ...state, bookmarks: [...addBookmark] };
    },
    removeBookmark: (state, action) => {
      const removeBookmark = [...state.bookmarks].filter(
        (item) => item !== action.payload.verse_key
      );

      updateDoc(doc(db, "users", action.payload.uid), {
        bookmarks: removeBookmark,
      });

      return { ...state, bookmarks: removeBookmark };
    },
    toggleTranslation: (state, action) => {
      updateDoc(doc(db, "users", action.payload.uid), {
        translation: action.payload.value,
      });

      return { ...state, translation: action.payload.value };
    },
    toggleDarkmode: (state, action) => {
      updateDoc(doc(db, "users", action.payload.uid), {
        darkmode: action.payload.value,
      });

      return { ...state, darkmode: action.payload.value };
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
  updateTextArabic,
  updateTextTranslation,
  addBookmark,
  removeBookmark,
  toggleTranslation,
  toggleDarkmode,
} = firebaseSlice.actions;
export default firebaseSlice.reducer;
