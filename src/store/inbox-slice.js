import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emails: [],
  totalQuantity: 0,
  changed: false,
  unseenMessage: 0 }; 

const inbox = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceEmail(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.emails = action.payload.emails;
    },

    addItemToEmail(state, action) {
      const newItem = action.payload;
      state.changed = true;
      state.totalQuantity++;
      
      state.emails.push({
        id: newItem.id,
        date: newItem.date,
        quantity: 1,
        subject: newItem.subject,
        toEmail: newItem.toEmail,
        message: newItem.message,
      });
    },
    removeItemFromEmail(state, action) {
      const id = action.payload;

      const existingItemIndex = state.emails.findIndex(
        (item) => item.id === id
      );

      if (existingItemIndex !== -1) {
        state.totalQuantity--;
        state.changed = true;

        // Remove the item at the existingItemIndex
        state.emails.splice(existingItemIndex, 1);
      }
    },

    unseenMessageHandler(state){
      state.unseenMessage=state.totalQuantity-1;
    }
  },
});

export const { addItemToEmail, removeItemFromEmail, replaceEmail,unseenMessageHandler } =inbox.actions; //
export default inbox.reducer;
