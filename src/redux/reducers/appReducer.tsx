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
  selectedDevice: string;
  selectedEventId: string;
}

const initialState: AuthState = {
  currentUser: null,
  selectedDevice: "",
  selectedEventId: "",
};

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<CurrentUser>) => {
      state.currentUser = action.payload;
    },
    setSelectedDevice: (state, action: PayloadAction<string>) => {
      state.selectedDevice = action.payload;
    },
    setSelectedEventId: (state, action: PayloadAction<string>) => {
      state.selectedEventId = action.payload;
    },
  },
});

export const { setCurrentUser, setSelectedDevice, setSelectedEventId } =
  appSlice.actions;
export default appSlice.reducer;
