import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth-slice';
import darkMode from './darkMode';
import inboxSlice from './inbox-slice';
import isVisibleReducer from './isVisible';
 const store = configureStore({
  reducer: {
    auth:authSlice,
    theme:darkMode,
    inbox:inboxSlice,
    isVisible:isVisibleReducer
  },
})
 export default store;
 