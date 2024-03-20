import Mapbox from "./components/organisms/Mapbox";
import { RootState } from "./state/store";
import { useSelector } from "react-redux";
import Navbar from "./components/organisms/Navbar";

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
            <Navbar />
            <Mapbox />
        </>
    );
}

export default App;
