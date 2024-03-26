import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Hike, HikePreview } from "../../types/hikes";
import { Location } from "../location/locationSlice";
import { FeatureCollection } from "geojson";
import { gpx } from "@tmcw/togeojson";

interface HikeState {
    hikesPreview: HikePreview[];
    selectedHike?: Hike;
    selectedGeoJsonHike?: FeatureCollection;
    isHikesPreviewLoading: boolean;
}

const initialState: HikeState = {
    hikesPreview: [],
    selectedHike: undefined,
    selectedGeoJsonHike: undefined,
    isHikesPreviewLoading: true,
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
        builder
            .addCase(hikeAsync.pending, (state) => {
                state.isHikesPreviewLoading = true;
            })
            .addCase(
                hikePreviewAsync.fulfilled,
                (state, action: PayloadAction<HikePreview[]>) => {
                    state.hikesPreview = action.payload;
                    state.isHikesPreviewLoading = false;
                }
            );

        builder.addCase(
            hikeAsync.fulfilled,
            (state, action: PayloadAction<Hike>) => {
                state.selectedHike = action.payload;
            }
        );
        builder.addCase(
            gpxAsync.fulfilled,
            (state, action: PayloadAction<FeatureCollection>) => {
                state.selectedGeoJsonHike = action.payload;
            }
        );
    },
});

export const hikePreviewAsync = createAsyncThunk(
    "hike/fetchHikesPreview",
    async (location: Location) => {
        const hikes = await fetch(
            `http://localhost:80/api/hikes/search?latitude=${location.coordinates[1]}&longitude=${location?.coordinates[0]}&radius=50`
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

export const gpxAsync = createAsyncThunk(
    "hike/fetchGpx",
    async (url: string) => {
        const geoJson: FeatureCollection = await fetch(url)
            .then((response) => response.text())
            .then((data) => {
                return gpx(new DOMParser().parseFromString(data, "text/xml"));
            });

        return geoJson;
    }
);

export const { setHikesPreview, setSelectedHike } = hikeSlice.actions;
export default hikeSlice.reducer;
