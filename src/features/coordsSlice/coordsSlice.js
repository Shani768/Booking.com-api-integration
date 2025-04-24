import { createSlice } from '@reduxjs/toolkit';

const coordsSlice = createSlice({
  name: 'coords',
  initialState: {
    coords: [], // Default center coordinates are empty
  },
  reducers: {
    setMapCoords: (state, action) => {
      state.coords = action.payload;
    },
  },
});

export const { setMapCoords } = coordsSlice.actions;
export default coordsSlice.reducer;
