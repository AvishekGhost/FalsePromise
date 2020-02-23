import React from "react";

export const DisplayMapFC = () => {
	// Create a reference to the HTML element we want to put the map on
	const mapRef = React.useRef(null);

	/**
	 * Create the map instane
	 * While `useEffect` could also be used here, `useLayoutEffect` will render
	 * the map sooner
	 */

	React.useLayoutEffect(() => {
		// `mapRef.current` will be `undefined` when this hook first runs; edgecase that
		if (!mapRef.current) return;
		const H = window.H;
		const platform = new H.service.Platform({
			apikey: "GNlK1kK3P7tTxS5vrdpv4QcgVHRjxQ-DJarCupZQms0"
		});
		const defaultLayers = platform.createDefaultLayers();
		const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
			center: { lat: 50, lng: 50 },
			zoom: 4,
			pixelRatio: window.devicePixelRatio || 1
		});

		const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

		const ui = H.ui.UI.createDefault(hMap, defaultLayers);

		// This will act as a cleanup to run once this hook runs again.
		// This includes when the component unmounds
		return () => {
			hMap.dispose();
		};
	}, [mapRef]); // This will run this hook every time this ref is updated

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
