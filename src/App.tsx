import { useState } from "react";
import SearchBar from "./components/organisms/SearchBar";
import Mapbox from "./components/organisms/Mapbox";

function App() {
    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleSelectedLocation = (location) => {
        // const convertedLocation = {
        //     lng: location.centerCoordinates[0],
        //     lat: location.centerCoordinates[1],
        // };

        setSelectedLocation(location.centerCoordinates);
    };

    return (
        <>
            <SearchBar handleSelectedLocation={handleSelectedLocation} />
            <Mapbox selectedLocation={selectedLocation} />
        </>
    );
}

export default App;
