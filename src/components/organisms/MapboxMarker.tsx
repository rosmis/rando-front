import { FaLocationDot } from "react-icons/fa6";
import { Marker } from "react-map-gl";
import { Hike, HikePreview } from "../../types/hikes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { setSelectedLocation } from "../../state/location/locationSlice";
import { gpxAsync, hikeAsync } from "../../state/hike/hikeSlice";
import { useEffect } from "react";
import { Feature, LineString } from "geojson";
import { PayloadAction } from "@reduxjs/toolkit";

const MapboxMarker = ({ hike }: { hike: HikePreview }) => {
    const dispatch = useDispatch<AppDispatch>();

    const selectedHike = useSelector(
        (state: RootState) => state.hike.selectedHike
    );
    const selectedGeoJsonHike = useSelector(
        (state: RootState) => state.hike.selectedGeoJsonHike
    );

    console.log("render MARKER");

    const handleHikeSelection = async () => {
        console.log("clicked handleHikeSelection");

        const hikePayload: PayloadAction<Hike> = await dispatch(
            hikeAsync(hike.id)
        );

        dispatch(gpxAsync(hikePayload.payload.gpx_url));
    };

    // handle geojson path and camera position when hike is selected
    useEffect(() => {
        if (selectedGeoJsonHike && selectedHike?.id === hike.id) {
            console.log("geojson USE EFFECT", selectedGeoJsonHike);

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

            const selectedHikeBoundingBox = calculateBbox(
                [lngSum / count, latSum / count],
                3
            );

            console.log("bbox", selectedHikeBoundingBox);

            dispatch(
                setSelectedLocation({
                    coordinates: undefined,
                    bbox: selectedHikeBoundingBox,
                    placeType: "POI",
                })
            );
        }
    }, [selectedGeoJsonHike, selectedHike, dispatch, hike.id]);

    return (
        <>
            <Marker
                longitude={hike.longitude}
                latitude={hike.latitude}
                onClick={handleHikeSelection}
                style={{
                    cursor: "pointer",
                    opacity: !selectedHike
                        ? 1
                        : selectedHike.id === hike.id
                        ? 1
                        : 0.5,
                }}
            >
                <FaLocationDot size={30} color="#ad4343" />
            </Marker>
        </>
    );
};

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

export default MapboxMarker;
