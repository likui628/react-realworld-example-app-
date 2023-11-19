import { createSlice } from '@reduxjs/toolkit';
interface InitState {
  name: string;
}

const initialState: InitState = {
  name: 'jacky',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      console.log('userLogin', state, action.payload);
    },
  },
});

export const { userLogin } = userSlice.actions;
export default userSlice.reducer;
