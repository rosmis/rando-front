import { useState } from "react";
import SearchBar from "./components/organisms/SearchBar";

function App() {
    const [selectedLocation, setSelectedLocation] = useState([]);

    const handleSelectedLocation = (location) => {
        setSelectedLocation(location.centerCoordinates);
    };

    return (
        <>
            <h1>Search for a location</h1>
            <pre className="text-white">
                Selected coordinates: {selectedLocation}
            </pre>
            <SearchBar handleSelectedLocation={handleSelectedLocation} />
        </>
    );
}

export default App;
