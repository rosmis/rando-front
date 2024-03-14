import SearchBar from "./components/organisms/SearchBar";
import Mapbox from "./components/organisms/Mapbox";
import { RootState } from "./state/store";
import { useSelector } from "react-redux";

function App() {
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

    return (
        <>
            <SearchBar />
            <Mapbox />
        </>
    );
}

export default App;
