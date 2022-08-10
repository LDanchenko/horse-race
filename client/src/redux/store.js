import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  race: {},
};

const raceSlice = createSlice({
  name: "race",
  initialState,
  reducers: {
    setRaceData(state, { payload }) {
      return { ...state, race: payload.data };
    },
    setError(state, { payload }) {
      return { ...state, error: payload };
    },
  },
});

export const { setRaceData, setError } = raceSlice.actions;

export const store = configureStore({
  reducer: raceSlice.reducer,
});
