import { configureStore } from "@reduxjs/toolkit";

import gameHistoryReducer from "./gameHistory";
import nameReducer from "./name";
import profilePictReducer from "./profilePict";

const store = configureStore({
	reducer: {
		gameHistory: gameHistoryReducer,
		name: nameReducer,
		profilePict: profilePictReducer,
	},
});

export default store;
