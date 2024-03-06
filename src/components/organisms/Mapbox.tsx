import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const Mapbox = ({ selectedLocation }) => {
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

        // Add our navigation control (the +/- zoom buttons)
        // map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

        // Map onload event
        // map.current.on("load", () => {
        //     // Nifty code to force map to fit inside container when it loads
        //     map.current.resize();
        // });

        // Clean up on unmount
        return () => map.current.remove();
    }, []);

    useEffect(() => {
        if (selectedLocation && map.current) {
            console.log("selectedLocation", selectedLocation);
            map.current.flyTo({
                center: [selectedLocation[0], selectedLocation[1]],
                // center: [selectedLocation.lng, selectedLocation.lat],
                essential: true, // this animation is considered essential with respect to prefers-reduced-motion
            });
        }
    }, [selectedLocation]);

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

export default Mapbox;
