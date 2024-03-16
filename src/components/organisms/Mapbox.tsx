import { useMemo } from "react";
import { useEffect, useRef, useState } from "react";
import { AppDispatch, RootState } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { hikeAsync, hikePreviewAsync } from "../../state/hike/hikeSlice";
import Map, { MapRef, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FaLocationDot } from "react-icons/fa6";
import { setSelectedLocation } from "../../state/location/locationSlice";
import { ZoomLevels } from "../../types/zoomLevels";

const Mapbox = () => {
    const mapRef = useRef<MapRef>(null);
    const mapboxAccessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    const dispatch = useDispatch<AppDispatch>();

    const [lng, setLng] = useState(3.074001);
    const [lat, setLat] = useState(46.959325);
    const [zoom, setZoom] = useState(5);

    const selectedLocation = useSelector(
        (state: RootState) => state.location.selectedLocation
    );
    const hikesPreview = useSelector(
        (state: RootState) => state.hike.hikesPreview
    );

    const selectedHike = useSelector(
        (state: RootState) => state.hike.selectedHike
    );

    useEffect(() => {
        if (selectedLocation && mapRef.current) {
            dispatch(hikePreviewAsync(selectedLocation));

            if (selectedLocation.bbox) {
                mapRef.current.fitBounds(
                    [
                        [selectedLocation.bbox[0], selectedLocation.bbox[1]],
                        [selectedLocation.bbox[2], selectedLocation.bbox[3]],
                    ],
                    {
                        padding: { top: 10, bottom: 25, left: 15, right: 5 },
                    }
                );
            } else {
                mapRef.current.flyTo({
                    center: [
                        selectedLocation.coordinates[0],
                        selectedLocation.coordinates[1],
                    ],
                    zoom: ZoomLevels[selectedLocation.placeType],
                    essential: true,
                });
            }
        }
    }, [dispatch, selectedLocation]);

    const markers = useMemo(
        () =>
            hikesPreview.map((hike, i) => {
                return (
                    <Marker
                        key={i}
                        longitude={hike.longitude}
                        latitude={hike.latitude}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            dispatch(
                                setSelectedLocation({
                                    coordinates: [
                                        hike.longitude,
                                        hike.latitude,
                                    ],
                                    bbox: undefined,
                                    placeType: "POI",
                                })
                            );
                            dispatch(hikeAsync(hike.id));
                        }}
                    >
                        <FaLocationDot size={30} color="#ad4343" />
                    </Marker>
                );
            }),

        [dispatch, hikesPreview]
    );

    // const markers = useMemo(() => {
    //     return {
    //         type: "FeatureCollection",
    //         features: [
    //             ...hikesPreview.map((hike) => {
    //                 return {
    //                     type: "Feature",
    //                     geometry: {
    //                         type: "Point",
    //                         coordinates: [hike.longitude, hike.latitude],
    //                     },
    //                 };
    //             }),
    //         ],
    //     };
    // }, [hikesPreview]);

    return (
        <>
            {/* <div className="absolute top-20 left-0 bg-red-600 z-50">
                {JSON.stringify(selectedHike)}
            </div> */}

            <Map
                initialViewState={{
                    longitude: lng,
                    latitude: lat,
                    zoom: zoom,
                }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                // mapStyle="mapbox://styles/rosmis/cltem9q7l002y01qwa3qk23tn"
                mapboxAccessToken={mapboxAccessToken}
                style={{ width: "100vw", height: "100vh" }}
                ref={mapRef}
            >
                {/* {hikesPreview.length && (
                    <Source
                        id="hikes"
                        type="geojson"
                        data={JSON.stringify(markers)}
                        // cluster={true}
                        // clusterMaxZoom={14}
                        // clusterRadius={50}
                    >
                        <Layer {...hikeCluster} />
                    </Source>
                )} */}
                {markers}
            </Map>
        </>
    );
};

export default Mapbox;
