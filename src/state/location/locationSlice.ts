import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ZoomLevels } from "../../types/zoomLevels";

export interface Location {
    coordinates?: number[];
    bbox: number[];
    placeType: keyof typeof ZoomLevels;
}

interface ResultLocation {
    name: string;
    location: string;
    centerCoordinates: number[];
    bbox: number[];
    placeType: string;
}

interface LocationState {
    searchedLocation: string;
    selectedLocation?: Location;
    locations: ResultLocation[];
}

const initialState: LocationState = {
    searchedLocation: "",
    selectedLocation: undefined,
    locations: [],
};

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setSearchedLocation: (state, action: PayloadAction<string>) => {
            state.searchedLocation = action.payload;
        },
        setSelectedLocation: (state, action: PayloadAction<Location>) => {
            state.selectedLocation = action.payload;
        },
        setLocations: (state, action: PayloadAction<ResultLocation[]>) => {
            state.locations = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(locationsAsync.fulfilled, (state, action) => {
            state.locations = action.payload.features.map((location) => {
                const [exactLocation, ...locationName] =
                    location.place_name.split(", ");

                return {
                    name: exactLocation,
                    location: locationName.join(", "),
                    centerCoordinates: location.center,
                    bbox: location.bbox,
                    placeType: location.place_type[0],
                };
            });
        });
    },
});

export const locationsAsync = createAsyncThunk(
    "location/fetchLocations",
    async (location: string) => {
        const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

        const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?proximity=ip&language=fr&access_token=${accessToken}`
        );

        const data = await response.json();

        return data;
    }
);

export const { setSearchedLocation, setSelectedLocation, setLocations } =
    locationSlice.actions;

export default locationSlice.reducer;
