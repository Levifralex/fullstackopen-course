/* const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.payload;
    default:
      return state;
  }
};

//action creators
export const filterChange = (filter) => {
  return {
    type: "SET_FILTER",
    payload: filter,
  };
};

export default filterReducer; */

import { createSlice, current } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: "filter",
  initialState: '',
  reducers: {
    filterChange(state, action) {
      console.log(current(state))
      return action.payload;
    },
  },
});

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer