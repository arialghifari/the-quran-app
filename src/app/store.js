import { configureStore } from "@reduxjs/toolkit";
import { quranApi } from "../services/quranApi";
import audioSlice from "../reducers/audioSlice";

const store = configureStore({
  reducer: {
    audio: audioSlice,
    [quranApi.reducerPath]: quranApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(quranApi.middleware),
});

export default store;
