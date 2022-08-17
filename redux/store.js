import { configureStore } from "@reduxjs/toolkit";
import gameHistoryReducer from "./gameHistory";
import nameReducer from "./name";

const store = configureStore({
  reducer: {
    gameHistory: gameHistoryReducer,
    name: nameReducer,
  },
});

export default store;
