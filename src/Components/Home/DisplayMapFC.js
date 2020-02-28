import React, { useState, useRef, useEffect } from "react";

export const DisplayMapFC = () => {
  const mapRef = useRef();
  const [lat, setLat] = useState(12);
  const [lon, setLon] = useState(12);
  const [zoomIn, setZoomIn] = useState(12);

  const getLoc = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
        },
        error => this.setState(console.log(error))
      );
    }
  };
 

  useEffect(() => {
	  getLoc();
  }, [])

  React.useLayoutEffect(() => {
    if (!mapRef.current) return;
    const H = window.H;
    const platform = new H.service.Platform({
      apikey: "GNlK1kK3P7tTxS5vrdpv4QcgVHRjxQ-DJarCupZQms0"
    });
    const defaultLayers = platform.createDefaultLayers();
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: lat, lng: lon },
      zoom: zoomIn,
      pixelRatio: window.devicePixelRatio || 1
    });

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

    const ui = H.ui.UI.createDefault(hMap, defaultLayers);
    const svgMarkup = require('./iconfinder.svg');
	const customIcon = new H.map.Icon(svgMarkup);
    const donorLocation = new H.map.Marker(
      { lat: lat, lng: lon },
    	{ icon: customIcon }
    );

    hMap.addObject(donorLocation);

    return () => {
      hMap.dispose();
    };
  }, [mapRef, lat, lon, zoomIn]);

  return (
    <>
      <div
        className="map"
        ref={mapRef}
        style={{ height: "90vh", borderRadius: "10px" }}
      />
     
    </>
  );
};
