import Mapbox from "./components/organisms/Mapbox";
import Navbar from "./components/organisms/Navbar";
import Sidebar from "./components/organisms/Sidebar";
import React from "react";
import { MapRef } from "react-map-gl";
import { MapRefProvider } from "./composables/useMapRef";

function App() {
    // DEBUG PURPOSES
    // const searchedLocation = useSelector(
    //     (state: RootState) => state.location.searchedLocation
    // );
    const mapRef = React.useRef<MapRef>(null);

    return (
        <>
            <Navbar />

            <div className="flex items-start">
                <MapRefProvider value={mapRef}>
                    <Sidebar />

                    <Mapbox />
                </MapRefProvider>
            </div>
        </>
    );
}

export default App;
