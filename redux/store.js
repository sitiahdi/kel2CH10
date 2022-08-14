import { configureStore } from '@reduxjs/toolkit';

import gameHistoryReducer from './gameHistory';

const store = configureStore({
    reducer: {
        gameHistory: gameHistoryReducer
    }
});

export default store