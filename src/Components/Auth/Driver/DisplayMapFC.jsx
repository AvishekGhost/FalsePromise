import React from "react";
import GreenMarker from "../../Assets/GreenMarker.svg";
import RedMarker from "../../Assets/RedMarker.svg";
import BlueMarker from "../../Assets/BlueMarker.svg";

export const DisplayMapFC = () => {
  // Create a reference to the HTML element we want to put the map on
  const mapRef = React.useRef(null);

  /**
   * Create the map instane
   * While `useEffect` could also be used here, `useLayoutEffect` will render
   * the map sooner
   */
  React.useLayoutEffect(() => {
    if (!mapRef.current) return;
    const H = window.H;
    const platform = new H.service.Platform({
      apikey: "GNlK1kK3P7tTxS5vrdpv4QcgVHRjxQ-DJarCupZQms0"
    });
    var initiallat = 22.5524533;
    var initiallong = 88.411294;
    var finallat = 22.5653;
    var finallong = 88.3701;
    const defaultLayers = platform.createDefaultLayers();
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: 22.5, lng: 88.39 },
      zoom: 10,
      pixelRatio: window.devicePixelRatio || 1
    });

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

    const ui = H.ui.UI.createDefault(hMap, defaultLayers);

    var routingParameters = {
      // The routing mode:
      mode: "fastest;car",
      // The start point of the route:
      waypoint0: `geo!${initiallat},${initiallong}`,
      // The end point of the route:
      waypoint1: `geo!${finallat},${finallong}`,
      // To retrieve the shape of the route we choose the route
      // representation mode 'display'
      representation: "display"
    };

    const linestring = new H.geo.LineString();

    var routeLine = new H.map.Polyline(linestring, {
      style: {
        lineWidth: 10,
        strokeColor: "rgba(0, 128, 255, 0.7)",
        lineTailCap: "arrow-tail",
        lineHeadCap: "arrow-head"
      }
    });
    var routeArrow = new H.map.Polyline(linestring, {
      style: {
        lineWidth: 10,
        fillColor: "white",
        strokeColor: "rgba(255, 255, 255, 1)",
        lineDash: [0, 2],
        lineTailCap: "arrow-tail",
        lineHeadCap: "arrow-head"
      }
    });

    hMap.addObject(routeArrow, routeLine);

    return () => {
      hMap.dispose();
    };
  }, []); // This will run this hook every time this ref is updated

  return <div className="map" ref={mapRef} style={{ height: "500px" }} />;
};
