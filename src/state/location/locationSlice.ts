import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface LocationState {
    searchedLocation: string;
}

const initialState: LocationState = {
    searchedLocation: "",
};

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setSearchedLocation: (state, action: PayloadAction<string>) => {
            state.searchedLocation = action.payload;
        },
    },
});

export const { setSearchedLocation } = locationSlice.actions;

export default locationSlice.reducer;
