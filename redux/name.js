import { createSlice } from "@reduxjs/toolkit";

export const nameSlice = createSlice({
	name: "name",
	initialState: {
		name: null,
	},
	reducers: {
		setName: (state, action) => {
			state.name = action.payload;
		},
		selectName: (state) => {
			state.user.name;
		},
		setLogout: (state) => {
			state.name = null;
		},
	},
});

export default nameSlice.reducer;
export const { setName, selectName, setLogout } = nameSlice.actions;
