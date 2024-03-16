import { useMemo } from "react";
import { useEffect, useRef, useState } from "react";
import { AppDispatch, RootState } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { hikePreviewAsync } from "../../state/hike/hikeSlice";
import Map, { MapRef, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FaLocationDot } from "react-icons/fa6";
import { setSelectedLocation } from "../../state/location/locationSlice";

const zoomLevelsDict = {
    country: 5,
    region: 7,
    postcode: 9,
    district: 11,
    place: 13,
    locality: 15,
    neighborhood: 16,
    address: 17,
    poi: 17,
};

const Mapbox = () => {
    // const mapContainerRef = useRef(null);
    const mapRef = useRef<MapRef>(null);
    const dispatch = useDispatch<AppDispatch>();
    const mapboxAccessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    const [lng, setLng] = useState(3.074001);
    const [lat, setLat] = useState(46.959325);
    const [zoom, setZoom] = useState(5);

    const selectedLocation = useSelector(
        (state: RootState) => state.location.selectedLocation
    );
    const hikesPreview = useSelector(
        (state: RootState) => state.hike.hikesPreview
    );

    useEffect(() => {
        if (selectedLocation && mapRef.current) {
            dispatch(hikePreviewAsync(selectedLocation));

            mapRef.current.flyTo({
                center: [
                    selectedLocation.coordinates[0],
                    selectedLocation.coordinates[1],
                ],
                zoom: zoomLevelsDict[selectedLocation.placeType],
                essential: true,
            });
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
                                    placeType: "poi",
                                })
                            );
                        }}
                    >
                        <FaLocationDot size={30} color="#ad4343" />
                    </Marker>
                );
            }),

        [hikesPreview]
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
            <div className="absolute top-20 left-0 bg-red-600 z-50">
                {JSON.stringify(selectedLocation)}
            </div>

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
