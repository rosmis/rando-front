import { useEffect, useMemo, useState } from "react";
// import Searchbar from "./components/Searchbar";
import debounce from "lodash.debounce";
import UiInput from "./components/atoms/UiInput";
import { FaSearch } from "react-icons/fa";
import SearchInput from "./components/molecules/SearchInput";
import UiResult from "./components/atoms/UiResult";
import SearchBar from "./components/organisms/SearchBar";

function App() {
    // const [searchTerm, setSearchTerm] = useState("");
    // const [locations, setLocations] = useState([]);

    // const handleInputChange = async (e) => {
    //     console.log("searching for:", e.target.value);
    //     setSearchTerm(e.target.value);

    //     const locations = await getLocations(e.target.value);

    //     setLocations(
    //         locations.features.map((location) => {
    //             const [exactLocation, ...locationName] =
    //                 location.place_name.split(", ");
    //             return {
    //                 name: exactLocation,
    //                 location: locationName.join(", "),
    //                 center: location.center,
    //             };
    //         })
    //     );
    // };

    // const debouncedResults = useMemo(() => {
    //     return debounce(handleInputChange, 300);
    // }, []);

    // useEffect(() => {
    //     return () => {
    //         debouncedResults.cancel();
    //     };
    // });

    return (
        <>
            <h1>Search for a location</h1>
            <SearchBar />
            {/* <ul>
                {locations.map((location, i) => (
                    <li key={i}>
                        {location.name}, {location.location}
                    </li>
                ))}
            </ul> */}
        </>
    );
}

// async function getLocations(location: string) {
//     const accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

//     const response = await fetch(
//         `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?proximity=ip&access_token=${accessToken}`
//     );
//     const data = await response.json();
//     return data;
// }

export default App;
