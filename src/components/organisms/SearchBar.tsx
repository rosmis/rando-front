import { useEffect, useMemo, useState } from "react";
import SearchInput from "../molecules/SearchInput";
import debounce from "lodash.debounce";
import UiResult from "../atoms/UiResult";
import { FaX } from "react-icons/fa6";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [locations, setLocations] = useState([]);

    const handleInputChange = (newSearchTerm: string) => {
        setSearchTerm(newSearchTerm);

        debouncedResults(newSearchTerm);
    };

    const debouncedResults = useMemo(() => {
        return debounce(async (newSearchTerm: string) => {
            if (!newSearchTerm) return;

            const fetchedLocations = await getLocations(newSearchTerm);

            setLocations(
                fetchedLocations.features.map((location) => {
                    const [exactLocation, ...locationName] =
                        location.place_name.split(", ");

                    return {
                        name: exactLocation,
                        location: locationName.join(", "),
                        center: location.center,
                    };
                })
            );
        }, 300);
    }, []);

    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    }, [debouncedResults]);

    return (
        <div className="flex flex-col gap-2 items-start">
            <SearchInput
                handleInput={handleInputChange}
                iconRight={searchTerm ? <FaX className="text-xs" /> : <></>}
                searchTerm={searchTerm}
            />

            <div className="flex flex-col max-h-[250px] overflow-y-scroll">
                {!!searchTerm &&
                    locations.map((location, i) => {
                        const { name, location: locationDetails } = location;
                        return (
                            <UiResult
                                key={i}
                                mainResult={name}
                                secondaryResult={locationDetails}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

async function getLocations(location: string) {
    const accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

    const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?proximity=ip&access_token=${accessToken}`
    );
    const data = await response.json();

    return data;
}

export default SearchBar;
