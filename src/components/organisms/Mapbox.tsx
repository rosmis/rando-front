import { useMemo } from "react";
import { useEffect, useRef, useState } from "react";
import { AppDispatch, RootState } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import {
    gpxAsync,
    hikeAsync,
    hikePreviewAsync,
} from "../../state/hike/hikeSlice";
import Map, { Layer, MapRef, Marker, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FaLocationDot } from "react-icons/fa6";
import { setSelectedLocation } from "../../state/location/locationSlice";
import { HikePreview } from "../../types/hikes";
import { Feature, LineString } from "geojson";

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

    const selectedGeoJsonHike = useSelector(
        (state: RootState) => state.hike.selectedGeoJsonHike
    );

    useEffect(() => {
        if (selectedLocation && mapRef.current) {
            dispatch(hikePreviewAsync(selectedLocation));

            if (selectedLocation.bbox) {
                // TODO add dynamic radius after sidebar creation with radius
                const boundingBox = calculateBbox(
                    selectedLocation.coordinates,
                    50
                );

                mapRef.current.fitBounds(
                    [
                        [boundingBox[0], boundingBox[1]],
                        [boundingBox[2], boundingBox[3]],
                    ],
                    {
                        padding: { top: 10, bottom: 25, left: 15, right: 5 },
                    }
                );
            } else {
                // mapRef.current.flyTo({
                //     center: [
                //         selectedLocation.coordinates[0],
                //         selectedLocation.coordinates[1],
                //     ],
                //     zoom: ZoomLevels[selectedLocation.placeType],
                //     essential: true,
                // });
            }
        }
    }, [dispatch, selectedLocation]);

    const markers = useMemo(() => {
        const handleHikeSelection = (hike: HikePreview) => {
            dispatch(
                setSelectedLocation({
                    coordinates: [hike.longitude, hike.latitude],
                    bbox: undefined,
                    placeType: "POI",
                })
            );

            dispatch(hikeAsync(hike.id));
        };

        return hikesPreview.map((hike, i) => {
            return (
                <Marker
                    key={i}
                    longitude={hike.longitude}
                    latitude={hike.latitude}
                    style={{
                        cursor: "pointer",
                        opacity: !selectedHike
                            ? 1
                            : selectedHike.id === hike.id
                            ? 1
                            : 0.5,
                    }}
                    onClick={() => handleHikeSelection(hike)}
                >
                    <FaLocationDot size={30} color="#ad4343" />
                </Marker>
            );
        });
    }, [hikesPreview, dispatch, selectedHike]);

    useEffect(() => {
        if (selectedHike) {
            dispatch(gpxAsync(selectedHike.gpx_url));

            if (selectedGeoJsonHike && mapRef.current) {
                console.log("geojson", selectedGeoJsonHike);

                const geoJsonHikeCentroids: Array<number[]> =
                    selectedGeoJsonHike.features.map(
                        (feature: Feature<LineString>) => {
                            const center = calculateCentroid(feature);
                            return center;
                        }
                    );

                let latSum = 0;
                let lngSum = 0;
                let count = 0;
                geoJsonHikeCentroids.forEach((centroid) => {
                    lngSum += centroid[0];
                    latSum += centroid[1];
                    count++;
                });

                const hikeBoundingBox = calculateBbox(
                    [lngSum / count, latSum / count],
                    3
                );

                setTimeout(() => {
                    mapRef.current.fitBounds(
                        [
                            [hikeBoundingBox[0], hikeBoundingBox[1]],
                            [hikeBoundingBox[2], hikeBoundingBox[3]],
                        ],
                        {
                            padding: {
                                top: 10,
                                bottom: 25,
                                left: 15,
                                right: 5,
                            },
                        }
                    );
                }, 300);

                console.log("bbox", hikeBoundingBox);
            }
        }
    }, [selectedHike, dispatch]);

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

function calculateCentroid(geoJson: Feature<LineString>): [number, number] {
    let latSum = 0;
    let lngSum = 0;
    let count = 0;

    if (isArrayNested(geoJson.geometry.coordinates)) {
        for (const coord of geoJson.geometry.coordinates) {
            lngSum += coord[0];
            latSum += coord[1];
            count++;
        }

        return [lngSum / count, latSum / count];
    }

    latSum = geoJson.geometry.coordinates[1];
    lngSum = geoJson.geometry.coordinates[0];

    return [lngSum, latSum];
}

function isArrayNested(arr: number[] | Array<number[]>): boolean {
    return Array.isArray(arr) && arr.length > 0 && Array.isArray(arr[0]);
}

export default Mapbox;
