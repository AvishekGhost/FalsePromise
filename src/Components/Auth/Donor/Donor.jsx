import React, { useState, useEffect, useRef } from "react";
import { isAuthenticated, getBloodBanks, getReceivers } from "./index";
import Particles from "../../Home/ParticleContainer";
import classes from "./DonorSignup.module.css";
import RedMarker from "../../Assets/RedMarker.svg";
import BlueMarker from "../../Assets/BlueMarker.svg";
import GreenMarker from "../../Assets/GreenMarker.svg";

const Donor = () => {
  const mapRef = useRef();
  const [donorCurrentLatitude, setdonorCurrentLatitude] = useState(12);
  const [donorCurrentLongitude, setdonorCurrentLongitude] = useState(12);

  const [nearbyBloodBankLatitude, setNearbyBloodBankLatitude] = useState(null);
  const [nearbyBloodBankLongitude, setNearbyBloodBankLongitude] = useState(
    null
  );

  const [nearbyReceiverLongitude, setNearbyReceiverLongitude] = useState(null);
  const [nearbyReceiverLatitude, setNearbyReceiverLatitude] = useState(null);

  const [BloodBank_Data, setBloodBank_Data] = useState([]);
  const [Receiver_Data, setReceiver_Data] = useState([]);

  const [error, setError] = useState(null);
  const [bloodBank_Index, setBloodbank_Index] = useState(null);
  const [receiver_Index, setReceiver_Index] = useState(null);

  const getLoc = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setdonorCurrentLatitude(position.coords.latitude);
          setdonorCurrentLongitude(position.coords.longitude);
        },
        error => this.setState(console.log(error))
      );
    }
  };

  useEffect(() => {
    getBloodBanks().then(data => {
      if (data.error) setError(data.error);
      else {
        let arr = [];
        for (let i in data) {
          arr.push(JSON.parse(JSON.stringify(data[i])));
        }
        setBloodBank_Data(arr);
      }
    });

    getReceivers().then(data => {
      if (data.error) setError(data.error);
      else {
        let arr = [];
        for (let i in data) {
          arr.push(JSON.parse(JSON.stringify(data[i])));
        }

        setReceiver_Data(arr);

        setNearbyReceiverLatitude(data[1].latitude);
        console.log(data[1].latitude);
        setNearbyReceiverLongitude(data[1].longitude);
        console.log(data[1].longitude);
      }
    });

    getLoc();
  }, []);

  React.useLayoutEffect(() => {
    if (!mapRef.current) return;
    const H = window.H;
    const platform = new H.service.Platform({
      apikey: "GNlK1kK3P7tTxS5vrdpv4QcgVHRjxQ-DJarCupZQms0"
    });
    const defaultLayers = platform.createDefaultLayers();
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: donorCurrentLatitude, lng: donorCurrentLongitude },
      zoom: 9,
      pixelRatio: window.devicePixelRatio || 1
    });

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

    const ui = H.ui.UI.createDefault(hMap, defaultLayers);

    //console.log(behavior, ui);

    const request = {
      mode: "fastest;car",
      waypoint0: `geo!${donorCurrentLatitude},${donorCurrentLongitude}`,
      waypoint1: `geo!${nearbyBloodBankLatitude},${nearbyBloodBankLongitude}`,
      representation: "display"
    };

    const router = platform.getRoutingService();
    router.calculateRoute(request, response => {
      const shape = response.response.route[0].shape.map(x => x.split(","));
      const linestring = new H.geo.LineString();
      shape.forEach(s => linestring.pushLatLngAlt(s[0], s[1]));
      const routeLine = new H.map.Polyline(linestring, {
        style: { strokeColor: "red", lineWidth: 3 }
      });

      hMap.addObject(routeLine);
      hMap.getViewModel().setLookAtData({ bounds: routeLine.getBoundingBox() });
    });

    //Donor/current user Marker
    const customIcon = new H.map.Icon(BlueMarker);
    const donorLocation = new H.map.Marker(
      { lat: donorCurrentLatitude, lng: donorCurrentLongitude },
      { icon: customIcon }
    );

    //bloodbank marker
    const bloodbankMarkerIcon = new H.map.Icon(RedMarker);
    const bloodbankMarker = new H.map.Marker(
      { lat: nearbyBloodBankLatitude, lng: nearbyBloodBankLongitude },
      { icon: bloodbankMarkerIcon }
    );
    hMap.addObject(bloodbankMarker);

    //reciever marker
    const recieverMarkerIcon = new H.map.Icon(GreenMarker);
    const recieverMarker = new H.map.Marker(
      { lat: 22.598, lng: 88.3725 },
      { icon: recieverMarkerIcon }
    );

    hMap.addObject(donorLocation);

    hMap.addObject(recieverMarker);

    return () => {
      hMap.dispose();
    };
  }, [
    mapRef,
    donorCurrentLatitude,
    donorCurrentLongitude,
    nearbyBloodBankLatitude,
    nearbyBloodBankLongitude
  ]);

  document.body.className = classes.bcg;

  const MapContainer = () => {
    return (
      <div className={classes.mapContainer}>
        <div className="map" ref={mapRef} style={{ height: "74vh" }} />
        <div>
          <div className={classes.mapInfoContainer}>
            <img src={BlueMarker} alt="" height="50px" width="50px" />
            <div style={{ padding: "10px" }}>You are here</div>
          </div>
          <div className={classes.mapInfoContainer}>
            <img src={RedMarker} alt="" height="50px" width="50px" />
            <div style={{ padding: "10px" }}>Nearby Blood Banks</div>
          </div>
          <div className={classes.mapInfoContainer}>
            <img src={GreenMarker} alt="" height="50px" width="50px" />
            <div style={{ padding: "10px" }}>Needs Blood</div>
          </div>
        </div>
      </div>
    );
  };

  const gg1 = () => {
    console.log("BBBS");
    console.log(BloodBank_Data);
  };

  const renderNearbyBloodBanks = () => {
    if (BloodBank_Data) {
      return (
        <div>
          <h2>Blood {gg1()}</h2>
        </div>
      );
    }
  };

  const gg = () => {
    console.log("rec");
    console.log(Receiver_Data);
  };
  const renderNearbyRecievers = () => {
    if (Receiver_Data) {
      return (
        <div>
          <h2>Rec {gg()}</h2>
        </div>
      );
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
              Welcome, {isAuthenticated().donor.name}!
            </h2>
            <div className={classes.InfoContainer}>
              <div className={classes.arrayContainer}>
                {renderNearbyBloodBanks()}
              </div>
              <div className={classes.arrayContainer}>
                {renderNearbyRecievers()}
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

export default Donor;
