import { configureStore } from "@reduxjs/toolkit";
import { quranApi } from "../services/quranApi";

const store = configureStore({
  reducer: {
    [quranApi.reducerPath]: quranApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(quranApi.middleware),
});

export default store;
