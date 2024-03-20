import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./location/locationSlice";
import hikeReducer from "./hike/hikeSlice";
import mapboxReducer from "./mapbox/mapboxSlice";
import sidebarReducer from "./sidebar/sidebarSlice";

export const store = configureStore({
    reducer: {
        location: locationReducer,
        hike: hikeReducer,
        mapbox: mapboxReducer,
        sidebar: sidebarReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
