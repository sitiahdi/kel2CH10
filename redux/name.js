import { createSlice } from '@reduxjs/toolkit';



export const nameSlice = createSlice({
    name: "name",
    initialState: {
        name: ""
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        }
    }
});

export default nameSlice.reducer;
export const { setName } = nameSlice.actions;