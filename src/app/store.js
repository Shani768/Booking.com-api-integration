import { configureStore } from '@reduxjs/toolkit';
import suggestReducer from '../features/suggestSlice/suggestSlice';
import modalReducer from '../features/ModeSlice/ModelSlice';
import coordsReducer from '../features/coordsSlice/coordsSlice'; // Import the coords slice

export const store = configureStore({
  reducer: {
    suggest: suggestReducer,
    modal: modalReducer,
    coords: coordsReducer, // Add the coords slice
  },
});
