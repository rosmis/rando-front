import { useEffect, useMemo, useState } from "react";
import SearchInput from "../molecules/SearchInput";
import debounce from "lodash.debounce";
import UiResult from "../atoms/UiResult";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [locations, setLocations] = useState([]);

    const handleInputChange = async (e: string) => {
        setSearchTerm(e);

        const fetchedLocations = await getLocations(searchTerm);

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
    };

    const debouncedResults = useMemo(() => {
        return debounce(handleInputChange, 300);
    }, []);

    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    });

    return (
        <div className="flex flex-col gap-2 items-start">
            <SearchInput handleInput={handleInputChange} />

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
