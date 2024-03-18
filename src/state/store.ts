import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./location/locationSlice";
import hikeReducer from "./hike/hikeSlice";
import mapboxReducer from "./mapbox/mapboxSlice";

export const store = configureStore({
    reducer: {
        location: locationReducer,
        hike: hikeReducer,
        mapbox: mapboxReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
