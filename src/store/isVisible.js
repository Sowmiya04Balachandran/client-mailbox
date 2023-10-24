import { createSlice } from "@reduxjs/toolkit";

const initialState = { isVisible: false , };

const isVisible = createSlice({
  name: "isVisible",
  initialState,
  reducers: {
    composeVisible(state) {
        state.isVisible = !state.isVisible;
    },

    // newMessageToggleHandler(state){
    //   state.newMessageToggle = false;
    // },

  
  },
});


export const {composeVisible,newMessageToggleHandler}=isVisible.actions;
export default isVisible.reducer;
