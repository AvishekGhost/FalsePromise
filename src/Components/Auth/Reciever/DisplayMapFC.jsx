import React from "react";
import GreenMarker from "../../Assets/GreenMarker.svg";
import RedMarker from "../../Assets/RedMarker.svg";
import BlueMarker from "../../Assets/BlueMarker.svg";

export const DisplayMapFC = ({
  currentLatitude,
  currentLongitude,
  nearLatitude,
  nearLongitude
}) => {
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
    const defaultLayers = platform.createDefaultLayers();
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: currentLatitude, lng: currentLongitude },
      zoom: 9,
      pixelRatio: window.devicePixelRatio || 1
    });

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

    const ui = H.ui.UI.createDefault(hMap, defaultLayers);

    //console.log(behavior, ui);
    if (nearLatitude !== null && nearLongitude !== null) {
      const request = {
        mode: "fastest;car",
        waypoint0: `geo!${currentLatitude},${currentLongitude}`,
        waypoint1: `geo!${nearLatitude},${nearLongitude}`,
        representation: "display"
      };
      // console.log(nearbyBloodBankLatitude);
      const router = platform.getRoutingService();
      router.calculateRoute(request, response => {
        const shape = response.response.route[0].shape.map(x => x.split(","));
        const linestring = new H.geo.LineString();
        shape.forEach(s => linestring.pushLatLngAlt(s[0], s[1]));
        const routeLine = new H.map.Polyline(linestring, {
          style: { strokeColor: "red", lineWidth: 3 }
        });

        hMap.addObject(routeLine);
        hMap
          .getViewModel()
          .setLookAtData({ bounds: routeLine.getBoundingBox() });
      });
    }

    //Donor/current user Marker
    const customIcon = new H.map.Icon(BlueMarker);
    const donorLocation = new H.map.Marker(
      { lat: currentLatitude, lng: currentLongitude },
      { icon: customIcon }
    );
    console.log("gg");
    //bloodbank marker
    const bloodbankMarkerIcon = new H.map.Icon(RedMarker);
    const bloodbankMarker = new H.map.Marker(
      { lat: nearLatitude, lng: nearLongitude },
      { icon: bloodbankMarkerIcon }
    );
    hMap.addObject(bloodbankMarker);

    hMap.addObject(donorLocation);

    return () => {
      hMap.dispose();
    };
  }, [mapRef, nearLatitude, nearLongitude]); // This will run this hook every time this ref is updated

  return <div className="map" ref={mapRef} style={{ height: "500px" }} />;
};
