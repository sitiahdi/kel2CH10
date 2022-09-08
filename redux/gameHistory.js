import { createSlice } from "@reduxjs/toolkit";



export const gameHistorySlice = createSlice({
	name: "gameHistory",
	initialState: {
		history: []
	},
	reducers: {
		setHistory: (state, action) => {
			state.history = action.payload;
		}
	}
});

export default gameHistorySlice.reducer;
export const { setHistory } = gameHistorySlice.actions;