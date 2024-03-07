import { useState } from "react";
import SearchBar from "./components/organisms/SearchBar";
import Mapbox from "./components/organisms/Mapbox";

function App() {
    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleSelectedLocation = (location) => {
        setSelectedLocation({
            coordinates: location.centerCoordinates,
            placeType: location.placeType,
        });
    };

    return (
        <>
            <SearchBar handleSelectedLocation={handleSelectedLocation} />
            <Mapbox selectedLocation={selectedLocation} />
        </>
    );
}

export default App;
