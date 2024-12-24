import {configureStore} from '@reduxjs/toolkit';
import {syncReducer} from './SyncReducer';

export const store = configureStore({
  reducer: {
    sync: syncReducer,
  },
});
