import { createSlice } from "@reduxjs/toolkit";

export const profilePict = createSlice({
	name: "pict",
	initialState: {
		pict: null,
	},
	reducers: {
		setPict: (state, action) => {
			state.pict = action.payload;
		}
	},
});

export default profilePict.reducer;
export const { setPict } = profilePict.actions;