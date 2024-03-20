import Mapbox from "./components/organisms/Mapbox";
import { RootState } from "./state/store";
import { useSelector } from "react-redux";
import Navbar from "./components/organisms/Navbar";
import Sidebar from "./components/organisms/Sidebar";

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

            <div className="flex items-start">
                <Sidebar />

                <Mapbox />
            </div>
        </>
    );
}

export default App;
