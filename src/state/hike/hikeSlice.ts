import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Hike, HikePreview } from "../../types/hikes";
import { Location } from "../location/locationSlice";

interface HikeState {
    hikesPreview: HikePreview[];
    selectedHike?: Hike;
}

const initialState: HikeState = {
    hikesPreview: [],
    selectedHike: undefined,
};

const hikeSlice = createSlice({
    name: "hike",
    initialState,
    reducers: {
        setHikesPreview: (state, action: PayloadAction<HikePreview[]>) => {
            state.hikesPreview = action.payload;
        },
        setSelectedHike: (state, action: PayloadAction<Hike>) => {
            state.selectedHike = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(hikePreviewAsync.fulfilled, (state, action) => {
            state.hikesPreview = action.payload;
        });
        builder.addCase(hikeAsync.fulfilled, (state, action) => {
            state.selectedHike = action.payload;
        });
    },
});

export const hikePreviewAsync = createAsyncThunk(
    "hike/fetchHikesPreview",
    async (location: Location) => {
        const hikes = await fetch(
            `http://localhost:80/api/hikes/search?latitude=${location.coordinates[1]}&longitude=${location.coordinates[0]}&radius=50`
        ).then((response) => response.json());

        return hikes.data;
    }
);

export const hikeAsync = createAsyncThunk(
    "hike/fetchHike",
    async (id: number) => {
        const hike = await fetch(`http://localhost:80/api/hikes/${id}`).then(
            (response) => response.json()
        );

        return hike.data;
    }
);

export const { setHikesPreview, setSelectedHike } = hikeSlice.actions;
export default hikeSlice.reducer;
