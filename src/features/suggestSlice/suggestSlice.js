import { createSlice } from '@reduxjs/toolkit';
 
const initialState = {
    suggestResult : null
 }

const suggestSlice = createSlice({
  name: 'search',
    initialState,
  reducers: {
    setSuggestedResult: (state, action) => {
      state.suggestResult = action.payload;
    },
  },
});

export const { setSuggestedResult } = suggestSlice.actions;
// export const selectSelectedResult = state => state.search.selectedResult;

export default suggestSlice.reducer;
