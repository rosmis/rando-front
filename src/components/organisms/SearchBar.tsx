import { useEffect, useMemo, useState } from "react";
import SearchInput from "../molecules/SearchInput";
import debounce from "lodash.debounce";
import UiResult from "../atoms/UiResult";
import { FaX } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import {
    locationsAsync,
    setLocations,
    setSearchedLocation,
    setSelectedLocation,
} from "../../state/location/locationSlice";

const SearchBar = () => {
    const dispatch = useDispatch<AppDispatch>();

    const searchedLocation = useSelector(
        (state: RootState) => state.location.searchedLocation
    );
    const locations = useSelector(
        (state: RootState) => state.location.locations
    );

    const handleInputChange = (newSearchTerm: string) => {
        dispatch(setSearchedLocation(newSearchTerm));

        debounceSearch(newSearchTerm);
    };

    const handleLocationSelection = (location) => {
        dispatch(
            setSearchedLocation(location.name.concat(", ", location.location))
        );
        dispatch(
            setSelectedLocation({
                coordinates: location.centerCoordinates,
                bbox: location.bbox,
                placeType: location.placeType,
            })
        );

        dispatch(setLocations([]));
    };

    const debounceSearch = useMemo(() => {
        return debounce(async (newSearchTerm: string) => {
            if (!newSearchTerm) return;

            dispatch(locationsAsync(newSearchTerm));
        }, 300);
    }, []);

    useEffect(() => debounceSearch.cancel(), [debounceSearch]);

    return (
        <div className="flex flex-col relative items-start">
            <SearchInput
                handleInput={handleInputChange}
                iconRight={
                    searchedLocation ? <FaX className="text-xs" /> : <></>
                }
                searchTerm={searchedLocation}
            />

            <div className="absolute top-9 left-1/2 -translate-x-1/2 flex flex-col max-h-[350px] overflow-y-scroll bg-red-400">
                {!!searchedLocation &&
                    locations.map((location, i) => {
                        return (
                            // couldn't pass rounded prop boolean to styled-components, weird behavior
                            <UiResult
                                key={i}
                                location={location}
                                roundedtop={i === 0 ? "top" : ""}
                                roundedbottom={
                                    i === locations.length - 1 ? "bottom" : ""
                                }
                                handleSelectedLocation={handleLocationSelection}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default SearchBar;
