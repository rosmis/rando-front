import { useEffect, useMemo, useRef, useState } from "react";
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

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [isFocused, setIsFocused] = useState(false);

    const dispatch = useDispatch<AppDispatch>();

    const searchedLocation = useSelector(
        (state: RootState) => state.location.searchedLocation
    );
    const locations = useSelector(
        (state: RootState) => state.location.locations
    );

    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setSelectedIndex(-1); // Réinitialiser l'index sélectionné lorsque les résultats changent
      }, [locations]);

      useEffect(() => {
        if (isFocused && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isFocused]);

    const handleInputChange = (newSearchTerm: string) => {
        dispatch(setSearchedLocation(newSearchTerm));

        debounceSearch(newSearchTerm);
    };

    const handleKeyUp = (event) => {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setSelectedIndex((prevIndex) =>
                prevIndex < locations.length - 1 ? prevIndex + 1 : prevIndex
            );
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setSelectedIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : prevIndex
            );
        }else if (event.key === 'Escape') { // Réinitialiser la recherche lorsque la touche "Échap" est pressée
            dispatch(setLocations([])); // Effacer les résultats
            dispatch(setSearchedLocation('')); // Effacer le terme de recherche
            setSelectedIndex(-1); // Réinitialiser l'index sélectionné
        }else if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
            console.log('CTRL + K');
            setIsFocused(true); // Activer le focus sur la barre de recherche
        }else if (event.key === "Enter") {
            handleLocationSelection(locations[selectedIndex]);        
        }
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


    const handleItemClick = (index) => {
        console.log( index + ' index GOT CLICKED');
        setSelectedIndex(index);
        handleLocationSelection(locations[index]); // Appeler la fonction avec l'élément sélectionné
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
                handleKeyUp={handleKeyUp}
                handleBlur ={() => setIsFocused(false)} // Désactiver le focus lorsque la barre de recherche perd le focus
            />
            <div >

            </div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col max-h-[350px] overflow-y-scroll">
                {!!searchedLocation &&
                    locations.map((location, i) => {
                        return (
                            // couldn't pass rounded prop boolean to styled-components, weird behavior
                            <UiResult
                                key={i}
                                onClick={() => handleItemClick(i)}
                                location={location}
                                roundedtop={i === 0 ? "top" : ""}
                                roundedbottom={
                                    i === locations.length - 1 ? "bottom" : ""
                                }
                                handleSelectedLocation={handleLocationSelection}
                                isSelected={selectedIndex === i}
                                handlekeyeEnter={handleKeyUp}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default SearchBar;
