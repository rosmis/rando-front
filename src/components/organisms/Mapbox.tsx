import { useMemo } from "react";
import { useEffect, useRef, useState } from "react";
import { AppDispatch, RootState } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { hikePreviewAsync } from "../../state/hike/hikeSlice";
import Map, { MapRef, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

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
                        onClick={() => console.log(hike)}
                    >
                        <svg
                            fill="#ad4343"
                            version="1.1"
                            id="Capa_1"
                            width="40px"
                            height="40px"
                            viewBox="0 0 395.71 395.71"
                            stroke="#ad4343"
                            transform="rotate(0)"
                        >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                            <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            <g id="SVGRepo_iconCarrier">
                                <g>
                                    <path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738 c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388 C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191 c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z" />{" "}
                                </g>
                            </g>
                        </svg>
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
            {/* <div className="absolute top-5 left-0 bg-red-600 z-50">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
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
