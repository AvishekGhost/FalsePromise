import React, { useState, useEffect, useRef } from "react";
import { isAuthenticated, getOrders } from "./index";
import Particles from "../../Home/ParticleContainer";
import classes from "./BloodBank.module.css";
import RedMarker from "../../Assets/RedMarker.svg";
import BlueMarker from "../../Assets/BlueMarker.svg";

const BloodBank = () => {
  const mapRef = useRef();
  const [currentLatitude, setcurrentLatitude] = useState(12);
  const [currentLongitude, setcurrentLongitude] = useState(12);

  const [deliverLongitude, setDeliverLongitude] = useState(null);
  const [deliverLatitude, setDeliverLatitude] = useState(null);

  const [Order_data, setOrder_data] = useState([]);

  const [error, setError] = useState(null);

  const getLoc = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setcurrentLatitude(position.coords.latitude);
          setcurrentLongitude(position.coords.longitude);
        },
        error => this.setState(console.log(error))
      );
    }
  };

  useEffect(() => {
    getOrders().then(data => {
      if (data.error) setError(data.error);
      else {
        let arr = [];
        for (let i in data) {
          arr.push(JSON.stringify(data[i]));
          console.log(JSON.stringify(data[i]));
        }
        console.log("gson");
        for (let i in arr) {
          console.log(arr[i]);
        }

        setOrder_data(arr);

        // console.log(data[0]);
        // setDeliverLatitude(data[0].receiver_latitude);
        // setDeliverLongitude(data[0].receiver_longitude);
      }
    });

    getLoc();
  }, []);

  useEffect(() => {
    // let Player;
    // Gson g = new Gson();
    // Player p = g.fromJson(jsonString, Player.class)
    for (let i in Order_data) {
      console.log(JSON.parse(Order_data[i]).blood);
    }
  }, [Order_data]);

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
    if (deliverLatitude !== null && deliverLongitude !== null) {
      const request = {
        mode: "fastest;car",
        waypoint0: `geo!${currentLatitude},${currentLongitude}`,
        waypoint1: `geo!${deliverLatitude},${deliverLongitude}`,
        representation: "display"
      };
      console.log(deliverLongitude);
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
    const customIcon = new H.map.Icon(RedMarker);
    const donorLocation = new H.map.Marker(
      { lat: currentLatitude, lng: currentLongitude },
      { icon: customIcon }
    );

    //bloodbank marker
    const bloodbankMarkerIcon = new H.map.Icon(BlueMarker);
    const bloodbankMarker = new H.map.Marker(
      { lat: deliverLatitude, lng: deliverLongitude },
      { icon: bloodbankMarkerIcon }
    );
    hMap.addObject(bloodbankMarker);

    hMap.addObject(donorLocation);

    return () => {
      hMap.dispose();
    };
  }, [
    mapRef,
    currentLatitude,
    currentLongitude,
    deliverLatitude,
    deliverLongitude
  ]);

  document.body.className = classes.bcg;

  const MapContainer = () => {
    return (
      <div className={classes.mapContainer}>
        <div className="map" ref={mapRef} style={{ height: "74vh" }} />
        <div>
          <div className={classes.mapInfoContainer}>
            <img src={RedMarker} alt="" height="50px" width="50px" />
            <div style={{ padding: "10px" }}>You are here</div>
          </div>
          <div className={classes.mapInfoContainer}>
            <img src={BlueMarker} alt="" height="50px" width="50px" />
            <div style={{ padding: "10px" }}>Deliver Here</div>
          </div>
        </div>
      </div>
    );
  };

  const gg = () => {
    //console.log(Order_data[Object.keys(Order_data)].blood);
    //console.log(g);
  };

  const renderOrders = () => {
    if (Order_data) {
      //   let a = "0";
      //   console.log("gg");
      //   console.log(Order_data[0].blood);
      // }''
      console.log(Order_data[0]);
    }
  };

  return (
    <>
      {isAuthenticated() ? (
        <div className={classes.donorPageContainer}>
          <Particles />
          {MapContainer()}
          <div className={classes.mainContainer}>
            <h2
              style={{
                padding: "1vh",
                backgroundColor: "white",
                margin: "1vw"
              }}
            >
              Welcome, {isAuthenticated().bloodbank.name}!
            </h2>
            <div className={classes.InfoContainer}>
              <div className={classes.arrayContainer}>
                <h1>Orders</h1>
                {renderOrders()}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>please Login</h1>
      )}
    </>
  );
};

export default BloodBank;
