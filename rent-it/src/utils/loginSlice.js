import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name:"login",
    initialState: {
        items:[],
    },
    reducers:{
        addItems: (state, action) => {
            state.items.push(action.payload);
        },
        removeItem: (state) => {
            state.items.pop();
        },
        emptyItem: (state) => {
            state.items.length = 0;
        },
    },
});

export const {addItems, removeItem, emptyItem} = loginSlice.actions;

export default loginSlice.reducer;