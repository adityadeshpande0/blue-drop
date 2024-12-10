import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ExampleState {
  value: String;
}

const initialState: ExampleState = {
  value: "Aditya",
};

const dummySlice = createSlice({
  name: "dummy",
  initialState,
  reducers: {
    staticState: (state) => {
      state.value;
    },
    setValue: (state, action: PayloadAction<String>) => {
      state.value = action.payload;
    },
  },
});
export const { staticState, setValue } = dummySlice.actions;
export default dummySlice.reducer;
