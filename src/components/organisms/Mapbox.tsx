import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";

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

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const Mapbox = ({ selectedLocation, hikes }) => {
    const mapContainerRef = useRef(null);
    const map = useRef(null);

    const [lng, setLng] = useState(3.074001);
    const [lat, setLat] = useState(46.959325);
    const [zoom, setZoom] = useState(5);

    // Initialize map when component mounts
    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/rosmis/cltem9q7l002y01qwa3qk23tn/draft",
            center: [lng, lat],
            zoom: zoom,
        });

        map.current.on("move", () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });

        return () => map.current.remove();
    }, []);

    useEffect(() => {
        if (selectedLocation && map.current) {
            map.current.flyTo({
                center: [
                    selectedLocation.coordinates[0],
                    selectedLocation.coordinates[1],
                ],
                essential: true,
                zoom: zoomLevelsDict[selectedLocation.placeType],
            });

            // DEBUG PURPOSES
            map.current.addSource("circle", {
                type: "geojson",
                data: {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [
                            selectedLocation.coordinates[0],
                            selectedLocation.coordinates[1],
                        ],
                    },
                },
            });
            // DEBUG PURPOSES
            map.current.addLayer({
                id: "circle",
                type: "circle",
                source: "circle",
                paint: {
                    "circle-radius": {
                        stops: [
                            [0, 0],
                            [
                                20,
                                metersToPixelsAtMaxZoom(
                                    50000,
                                    selectedLocation.coordinates[1]
                                ),
                            ],
                        ],
                        base: 2,
                    },
                    "circle-color": "#007cbf",
                    "circle-opacity": 0.3,
                },
            });
        }
    }, [selectedLocation]);

    useEffect(() => {
        if (hikes.length && map.current) {
            map.current.loadImage(
                "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
                (error, image) => {
                    if (error) throw error;
                    map.current.addImage("custom-marker", image);

                    map.current.addSource("points", {
                        type: "geojson",
                        data: {
                            type: "FeatureCollection",
                            features: [
                                ...hikes.map((hike) => {
                                    return {
                                        type: "Feature",
                                        geometry: {
                                            type: "Point",
                                            coordinates: [
                                                hike.longitude,
                                                hike.latitude,
                                            ],
                                        },
                                    };
                                }),
                            ],
                        },
                    });

                    map.current.addLayer({
                        id: "points",
                        type: "symbol",
                        source: "points",
                        layout: {
                            "icon-image": "custom-marker",
                        },
                    });
                }
            );
        }
    }, [hikes]);

    return (
        <>
            <div className="absolute top-5 left-0 bg-red-600 z-50">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>

            <div
                className="map-container h-screen w-screen"
                ref={mapContainerRef}
            />
        </>
    );
};

const metersToPixelsAtMaxZoom = (meters, latitude) =>
    meters / 0.075 / Math.cos((latitude * Math.PI) / 180);
export default Mapbox;
