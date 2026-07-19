import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "UP", // UP, MAINTENANCE, DOWN
};

const backendStatusSlice = createSlice({
  name: "backendStatus",
  initialState,
  reducers: {
    backendUp(state) {
      state.status = "UP";
    },
    backendDown(state) {
      state.status = "DOWN";
    },
    backendMaintenance(state) {
      state.status = "MAINTENANCE";
    },
  },
});

export const { backendDown, backendUp } =
  backendStatusSlice.actions;

export default backendStatusSlice.reducer;
