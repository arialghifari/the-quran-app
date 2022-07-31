import { createSlice } from "@reduxjs/toolkit";

const audioSlice = createSlice({
  name: "audio",
  initialState: {
    isPlaying: false,
  },
  reducers: {
    play: (state) => {
      return { ...state, isPlaying: true };
    },
    pause: (state) => {
      return { ...state, isPlaying: false };
    },
  },
});

const selectIsPlaying = (state) => state.audio.isPlaying;
const selectCurrentVerse = (state) => state.audio.currentVerse;

export { selectIsPlaying, selectCurrentVerse };
export const { play, pause } = audioSlice.actions;
export default audioSlice.reducer;
