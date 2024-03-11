import { useEffect, useState } from "react";
import SearchBar from "./components/organisms/SearchBar";
import Mapbox from "./components/organisms/Mapbox";
import { RootState } from "./state/store";
import { useSelector } from "react-redux";

function App() {
    const [hikes, setHikes] = useState([]);

    // DEBUG PURPOSES
    // const searchedLocation = useSelector(
    //     (state: RootState) => state.location.searchedLocation
    // );
    const selectedLocation = useSelector(
        (state: RootState) => state.location.selectedLocation
    );
    // const locations = useSelector(
    //     (state: RootState) => state.location.locations
    // );

    // useEffect(() => {
    //     if (selectedLocation) {
    //         const getLocations = async (location) => {
    //             const hikes = await fetch(
    //                 `http://localhost:80/api/hikes/search?latitude=${location?.coordinates[1]}&longitude=${location?.coordinates[0]}&radius=50`
    //             ).then((response) => response.json());

    //             setHikes(hikes.data);
    //         };

    //         getLocations(selectedLocation);
    //     }
    // }, [selectedLocation]);

    return (
        <>
            <div className="absolute top-5 right-0 flex bg-red-600 z-50">
                <pre>{JSON.stringify(selectedLocation, null, 2)}</pre>
                {/* <pre>{JSON.stringify(locations, null, 2)}</pre> */}
            </div>
            <SearchBar />
            <Mapbox hikes={hikes} />
        </>
    );
}

export default App;
