import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    darkMode: false,
    profile:false,
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    toggleProfile:(state)=>{
      state.profile= !state.profile;
    }
  },
});

export const { toggleDarkMode ,toggleProfile } = themeSlice.actions;
export default themeSlice.reducer;
