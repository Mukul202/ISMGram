import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReduxUser, ReduxUserValue } from "../typings";

// interface ReduxUser{
//   username:string,
//   email:string,
//   profileImg:string,
//   _id:string
// }

const initialState:ReduxUser={
  user:{
    username:null,
    email:null,
    profileImg:null,
    _id:null
  }
};

const userSlice=createSlice({
  name:'user',
  initialState,
  reducers:{
    login:(state,action:PayloadAction<ReduxUserValue>) => {
      state.user=action.payload
    },
    logout:(state) => {
      state.user={
        username:null,
        email:null,
        profileImg:null,
        _id:null
      }
    }
  }
})

export const userActions=userSlice.actions;

export default userSlice.reducer;