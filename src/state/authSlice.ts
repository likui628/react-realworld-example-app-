import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/user';

interface InitState {
  user: User | null;
}

const initialState: InitState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: () => ({ user: loadUserFromLocalStorage() }),
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      writeUserToLocalStorage(action.payload);
      state.user = action.payload;
    },
    logout: state => {
      state.user = null;
      clearLocalStorage();
    },
  },
});

function writeUserToLocalStorage(user: User) {
  localStorage.setItem('jwtToken', user.token);
  localStorage.setItem('user', JSON.stringify(user));
}

function loadUserFromLocalStorage() {
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user) as User;
  }
  return null;
}

function clearLocalStorage() {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('user');
}

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
