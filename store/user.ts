import { createSlice } from "@reduxjs/toolkit";

const initialState={
  user:{}
};

const userSlice=createSlice({
  name:'user',
  initialState,
  reducers:{
    login(state,action){
      state.user=action.payload
    },
    logout(state){
      state.user={}
    }
  }
})

export const userActions=userSlice.actions;

export default userSlice.reducer;