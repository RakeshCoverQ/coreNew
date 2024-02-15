import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData:{}
};

const useInfoSlice = createSlice({
  name: 'useInfo',
  initialState,
  reducers: {
    userInfoAction(state, action) {
      state.userData = action.payload;
    },
    logoutAction(state) {
      state.userData = {};
    },
  },
});

export const { userInfoAction, logoutAction } = useInfoSlice.actions;

export default useInfoSlice.reducer;
