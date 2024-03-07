import { useEffect, useMemo, useState } from "react";
import SearchInput from "../molecules/SearchInput";
import debounce from "lodash.debounce";
import UiResult from "../atoms/UiResult";
import { FaX } from "react-icons/fa6";

const SearchBar = ({
  handleSelectedLocation: handleParentSelectedLocation,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locations, setLocations] = useState([]);

  const handleInputChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);

    debouncedResults(newSearchTerm);
  };

  const handleSelectedLocation = (location) => {
    setSearchTerm(location.name.concat(", ", location.location));

    handleParentSelectedLocation(location);
    setLocations([]);
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
            centerCoordinates: location.center,
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

      <div className="flex flex-col overflow-y-scroll">
        {!!searchTerm &&
          locations.map((location, i) => {
            return ( 
              // couldn't pass rounded prop boolean to styled-components, weird behavior
              <UiResult
                key={i}
                location={location}
                roundedtop={i === 0 ? "top" : ""}
                roundedbottom={i === locations.length - 1 ? "bottom" : ""}
                handleSelectedLocation={handleSelectedLocation}
              />
            );
          })}
      </div>
    </div>
  );
};

async function getLocations(location: string) {
  const accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

  console.log(accessToken);

  
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?proximity=ip&language=fr&access_token=${accessToken}`
  );
  const data = await response.json();

  return data;
}

export default SearchBar;
