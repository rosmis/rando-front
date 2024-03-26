import { useCallback, useMemo } from "react";
import { useEffect, useRef } from "react";
import { AppDispatch, RootState } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { hikePreviewAsync } from "../../state/hike/hikeSlice";
import Map, { Layer, MapRef, Source, ViewStateChangeEvent } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxMarker from "./MapboxMarker";
import { setViewState } from "../../state/mapbox/mapboxSlice";
import { Button } from "@/components/ui/button";
import { FaChevronRight } from "react-icons/fa6";
import { toggleSidebar } from "@/state/sidebar/sidebarSlice";

const Mapbox = () => {
    const mapRef = useRef<MapRef>(null);
    const mapboxAccessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    const dispatch = useDispatch<AppDispatch>();

    const viewState = useSelector((state: RootState) => state.mapbox.viewState);

    const selectedLocation = useSelector(
        (state: RootState) => state.location.selectedLocation
    );
    const hikesPreview = useSelector(
        (state: RootState) => state.hike.hikesPreview
    );

    const selectedGeoJsonHike = useSelector(
        (state: RootState) => state.hike.selectedGeoJsonHike
    );

    const isSidebarOpened = useSelector(
        (state: RootState) => state.sidebar.isOpen
    );

    // let bearing = 0;
    // let timeoutId: NodeJS.Timeout;

    // // camera animation
    // const rotateCamera = () => {
    //     if (mapRef.current && selectedLocation) {
    //         mapRef.current.flyTo({
    //             center: selectedLocation.coordinates,
    //             bearing: bearing,
    //             speed: 0.1,
    //             pitch: 65,
    //             curve: 1,
    //         });

    //         bearing = (bearing + 1) % 360;

    //         timeoutId = setTimeout(rotateCamera, 100);
    //     }
    // };

    useEffect(() => {
        if (selectedLocation && mapRef.current) {
            let selectedBoundingBox = selectedLocation.bbox;

            if (selectedLocation.placeType !== "HIKE") {
                dispatch(hikePreviewAsync(selectedLocation));

                // TODO add dynamic radius after sidebar creation with radius
                // Recalculate bbox with radius
                selectedBoundingBox = calculateBbox(
                    selectedLocation.coordinates,
                    50
                );
            }

            mapRef.current.fitBounds(
                [
                    [selectedBoundingBox[0], selectedBoundingBox[1]],
                    [selectedBoundingBox[2], selectedBoundingBox[3]],
                ],
                {
                    padding: { top: 10, bottom: 25, left: 15, right: 5 },
                }
            );

            // TODO find a way to implement this gadget feature properly
            // rotate camera only when hike selected and not when location selected
            // mapRef.current.once("moveend", () => {
            //     console.log("MOVE END");

            //     if (selectedLocation.placeType === "HIKE") {
            //         rotateCamera();
            //     }
            // });
        }

        // return () => {
        //     clearTimeout(timeoutId);
        // };
    }, [dispatch, selectedLocation]);

    const markers = useMemo(() => {
        console.log("USE MEMO MARKERS");

        return hikesPreview.map((hike, i) => {
            return <MapboxMarker key={i} hike={hike} />;
        });
    }, [hikesPreview]);

    const onMove = useCallback((event: ViewStateChangeEvent) => {
        dispatch(setViewState(event.viewState));
    }, []);

    // const onClick = useCallback(() => {
    //     console.log("click", selectedLocation, timeoutId);
    //     if (
    //         selectedLocation &&
    //         selectedLocation.placeType === "HIKE" &&
    //         timeoutId
    //     ) {
    //         console.log("clearing timeout");
    //         clearTimeout(timeoutId);
    //     }
    // }, [selectedLocation]);

    return (
        <div className="relative w-full rounded-tl-md rounded-bl-md">
            {/* <div className="absolute top-20 left-0 bg-red-600 z-50">
                {JSON.stringify(viewState)}
            </div> */}
            <Button
                className="z-10 absolute top-20 left-6"
                onClick={() => dispatch(toggleSidebar())}
            >
                <FaChevronRight
                    size="rounded"
                    className={
                        isSidebarOpened
                            ? "transform transition rotate-180"
                            : "transition"
                    }
                />
            </Button>

            <Map
                initialViewState={viewState}
                // mapStyle="mapbox://styles/mapbox/streets-v9"
                mapStyle="mapbox://styles/rosmis/cltem9q7l002y01qwa3qk23tn"
                mapboxAccessToken={mapboxAccessToken}
                style={{ minWidth: "65vw", maxWidth: "100vw", height: "100vh" }}
                // onMove={onMove}
                ref={mapRef}
            >
                {selectedGeoJsonHike && (
                    <Source
                        id="selected-hike"
                        type="geojson"
                        data={selectedGeoJsonHike}
                    >
                        <Layer
                            id="hike"
                            type="line"
                            paint={{
                                "line-color": "#ff0000",
                                "line-width": 2,
                            }}
                        />
                    </Source>
                )}
                {markers}
            </Map>
            {/* <div
                style={{ minWidth: "65vw", maxWidth: "100vw", height: "100vh" }}
                className="bg-red-600"
            ></div> */}
        </div>
    );
};

function calculateBbox(center: number[], radiusInKm: number) {
    const [lng, lat] = center;

    // Radius of the Earth in km
    const R = 6371;

    // Angular distance in radians on a great circle
    const radDist = radiusInKm / R;

    const minLat = lat - radDist * (180 / Math.PI);
    const maxLat = lat + radDist * (180 / Math.PI);

    const deltaLng = Math.asin(
        Math.sin(radDist) / Math.cos((lat * Math.PI) / 180)
    );
    const minLng = lng - deltaLng * (180 / Math.PI);
    const maxLng = lng + deltaLng * (180 / Math.PI);

    return [minLng, minLat, maxLng, maxLat];
}

export default Mapbox;
