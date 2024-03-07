import { map } from "lodash";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const StyledCompenent = styled.div`
  .map-container: 400px;
`;

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWJkb3VsYXllMDEiLCJhIjoiY2x0aDR6cTEwMDEzbzJpcW80eWwxMnRzZiJ9.FLVhBN9G0DcN4boan8xMsg";

function Mapbox() {
  const mapContainer = useRef<HTMLDivElement | null>(null); // Specify the type of mapContainer ref
  const [longitude, setLongitude] = useState(-70.9);
  const [latitude, setLatitude] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [longitude, latitude],
      zoom: zoom,
    });

    map.on('move', ()=>{

        setLongitude(map.getCenter().lng.toFixed(4));
        setLatitude(map.getCenter().lat.toFixed(4));    
        setZoom(map.getZoom().toFixed(2));
    })

    //
    return () => map.remove();
  }),[];

  
  useEffect(() => {
    
    
  })

  return (
    <StyledCompenent>
      <div>
        <div ref={mapContainer} className="map-container" />
      </div>
    </StyledCompenent>
  );
}

export default Mapbox;
