import {createSlice} from '@reduxjs/toolkit';

const initialState = {};

const userSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      console.log(action.payload);
      return {...state, ...action.payload};
    },
    clearUserDetails: (state, action) => {
      return {};
    },
  },
});
export const {setUserDetails, clearUserDetails} = userSlice.actions;
export default userSlice.reducer;
