import { configureStore } from "@reduxjs/toolkit";
import { quranApi } from "../services/quranApi";
import audioSlice from "../reducers/audioSlice";
import firebaseSlice from "../reducers/firebaseSlice";

const store = configureStore({
  reducer: {
    audio: audioSlice,
    firebase: firebaseSlice,
    [quranApi.reducerPath]: quranApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(quranApi.middleware),
});

export default store;
