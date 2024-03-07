import { useEffect, useState } from "react";
import SearchBar from "./components/organisms/SearchBar";
import Mapbox from "./components/organisms/Mapbox";

function App() {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [hikes, setHikes] = useState([]);

    const handleSelectedLocation = async (location) => {
        setSelectedLocation({
            coordinates: location.centerCoordinates,
            placeType: location.placeType,
        });
    };

    useEffect(() => {
        if (selectedLocation) {
            const getLocations = async (location) => {
                const hikes = await fetch(
                    `http://localhost:80/api/hikes?latitude=${location?.coordinates[1]}&longitude=${location?.coordinates[0]}&radius=50`
                ).then((response) => response.json());

                setHikes(hikes.data);
            };

            getLocations(selectedLocation);
        }
    }, [selectedLocation]);

    return (
        <>
            <SearchBar handleSelectedLocation={handleSelectedLocation} />
            <Mapbox selectedLocation={selectedLocation} hikes={hikes} />
        </>
    );
}

export default App;
