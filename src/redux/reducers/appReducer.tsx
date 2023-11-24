import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrentUser {
  id: number;
  email: string;
  type: string;
  created_at: number;
  updated_at: number;
  google_id: number | null;
}

interface AuthState {
  currentUser: CurrentUser | null;
}

const initialState: AuthState = {
  currentUser: null,
};

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<CurrentUser>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = appSlice.actions;
export default appSlice.reducer;
