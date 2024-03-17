import { useMemo } from "react";
import { useEffect, useRef, useState } from "react";
import { AppDispatch, RootState } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { hikePreviewAsync } from "../../state/hike/hikeSlice";
import Map, { Layer, MapRef, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxMarker from "./MapboxMarker";

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

    // let bearing = 0;

    // // camera animation
    // const rotateCamera = () => {
    //     if (mapRef.current) {
    //         mapRef.current.flyTo({
    //             center: coordinate,
    //             bearing: bearing,
    //             speed: 0.1,
    //             curve: 1,
    //         });

    //         bearing = (bearing + 10) % 360;

    //         setTimeout(rotateCamera, 100);
    //     }
    // };

    useEffect(() => {
        if (selectedLocation && mapRef.current) {
            let selectedBoundingBox = selectedLocation.bbox;

            if (selectedLocation.coordinates) {
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
        }
    }, [dispatch, selectedLocation]);

    const markers = useMemo(() => {
        console.log("USE MEMO MARKERS");

        return hikesPreview.map((hike, i) => {
            return <MapboxMarker key={i} hike={hike} />;
        });
    }, [hikesPreview]);

    return (
        <>
            {/* <div className="absolute top-20 left-0 bg-red-600 z-50">
                {JSON.stringify(selectedHike)}
            </div> */}

            <Map
                initialViewState={viewState}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                // mapStyle="mapbox://styles/rosmis/cltem9q7l002y01qwa3qk23tn"
                mapboxAccessToken={mapboxAccessToken}
                style={{ width: "100vw", height: "100vh" }}
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
        </>
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
