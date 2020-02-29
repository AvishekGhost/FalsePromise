import React, { useState, useEffect, useRef } from "react";
import { isAuthenticated, getBloodBanks, getReceivers, getTemp } from "./index";
import Particles from "../../Home/ParticleContainer";
import classes from "./DonorSignup.module.css";
import RedMarker from "../../Assets/RedMarker.svg";
import BlueMarker from "../../Assets/BlueMarker.svg";
import GreenMarker from "../../Assets/GreenMarker.svg";
import { Card, Col, Row, Text, Button } from "react-bootstrap";
// import HereMap from "./Map/HereMap";
import { DisplayMapFC } from "./DisplayMapFC";

const Donor = () => {
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
    console.log(BloodBank_Data);
  }, [BloodBank_Data]);

  useEffect(() => {
    getBloodBanks().then(data => {
      if (data.error) setError(data.error);
      else {
        let arr = [];
        for (let i in data) {
          arr.push(data[i]);
        }
        setBloodBank_Data(arr);

        setNearbyBloodBankLatitude(data[1].latitude);
        setNearbyBloodBankLongitude(data[1].longitude);
      }
    });

    getReceivers().then(data => {
      if (data.error) setError(data.error);
      else {
        let arr = [];
        for (let i in data) {
          arr.push(JSON.stringify(data[i]));
        }
        //console.log(arr);
        setReceiver_Data(arr);

        setNearbyReceiverLatitude(data[1].latitude);
        setNearbyReceiverLongitude(data[1].longitude);
      }
    });

    getLoc();
  }, []);

  document.body.className = classes.bcg;

  const MapContainer = () => {
    return (
      <div className={classes.mapContainer}>
        <DisplayMapFC
          currentLatitude={donorCurrentLatitude}
          currentLongitude={donorCurrentLongitude}
          nearLatitude={nearbyBloodBankLatitude}
          nearLongitude={nearbyBloodBankLongitude}
        />
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

  const setLocation = (lat, lon) => {
    console.log("called");
    setNearbyBloodBankLatitude(lat);
    console.log(nearbyBloodBankLatitude);
    setNearbyBloodBankLongitude(lon);
    // MapContainer();
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
                {BloodBank_Data.map((bloodbank, _id) => {
                  return (
                    <div>
                      <Card>
                        <Card.Text>{bloodbank.name}</Card.Text>
                        <Card.Text>{bloodbank.address}</Card.Text>
                        <Card.Text>{bloodbank.phone}</Card.Text>
                        <Card.Text>{bloodbank.bloodTypes["A+"]}</Card.Text>
                        <button
                          onClick={event =>
                            setLocation(bloodbank.latitude, bloodbank.longitude)
                          }
                        >
                          GG
                        </button>
                      </Card>
                    </div>
                  );
                })}
              </div>
              <div className={classes.arrayContainer}>
                {/* {renderNearbyRecievers()} */}
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
