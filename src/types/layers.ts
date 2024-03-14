import type { LayerProps } from "react-map-gl";

export const hikeCluster: LayerProps = {
    // TODO experimented with clustering, but it's not working as expected, fix this shit
    id: "hike-cluster",
    // type: "circle",
    // source: "hikes",
    // filter: ["has", "point_count"],
    // paint: {
    //     "circle-color": [
    //         "step",
    //         ["get", "point_count"],
    //         "#51bbd6",
    //         100,
    //         "#f1f075",
    //         750,
    //         "#f28cb1",
    //     ],
    //     "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
    // },
    type: 'circle',
    source: 'hikes',
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': '#11b4da',
      'circle-radius': 4,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#fff'
    }    
};
