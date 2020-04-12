import React, { useState, useEffect, useRef } from "react";
import { isAuthenticated, getBloodBanks, getReceivers, getTemp } from "./index";
import Particles from "../../Home/ParticleContainer";
import classes from "./DonorSignup.module.css";
import RedMarker from "../../Assets/RedMarker.svg";
import BlueMarker from "../../Assets/BlueMarker.svg";
import GreenMarker from "../../Assets/GreenMarker.svg";
import { Card } from "react-bootstrap";
// import HereMap from "./Map/HereMap";
import { DisplayMapFC } from "./DisplayMapFC.jsx";

const Donor = () => {
  const [donorCurrentLatitude, setdonorCurrentLatitude] = useState(12);
  const [donorCurrentLongitude, setdonorCurrentLongitude] = useState(12);

  const [nearbyBloodBankLatitude, setNearbyBloodBankLatitude] = useState(null);
  const [nearbyBloodBankLongitude, setNearbyBloodBankLongitude] = useState(
    null
  );

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
      }
    });

    getReceivers().then(data => {
      if (data.error) setError(data.error);
      else {
        let arr = [];
        for (let i in data) {
          arr.push(data[i]);
        }
        //console.log(arr);
        setReceiver_Data(arr);
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
            <div style={{ padding: "10px" }}>Nearby Blood Banks/Receivers</div>
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
                <Card className={classes.card}>
                  <Card.Text>Nearest BloodBanks</Card.Text>
                </Card>
                {BloodBank_Data.map((bloodbank, _id) => {
                  return (
                    <div>
                      <Card className={classes.card}>
                        <Card.Text>Name: {bloodbank.name}</Card.Text>
                        <Card.Text>Address: {bloodbank.address}</Card.Text>
                        <Card.Text>Ph: {bloodbank.phone}</Card.Text>
                        <Card.Text>
                          Contains Blood A+: {bloodbank.bloodTypes["A+"]}L
                        </Card.Text>
                        <button
                          style={{ width: "fit-content" }}
                          onClick={event =>
                            setLocation(bloodbank.latitude, bloodbank.longitude)
                          }
                        >
                          Navigate to this Blood Bank
                        </button>
                      </Card>
                    </div>
                  );
                })}
              </div>
              <div className={classes.arrayContainer}>
                <Card className={classes.card}>
                  <Card.Text>Nearest Receiver</Card.Text>
                </Card>
                {Receiver_Data.map((receiver, _id) => {
                  return (
                    <div>
                      <Card className={classes.card}>
                        <Card.Text>Name: {receiver.name}</Card.Text>
                        <Card.Text>Address: {receiver.address}</Card.Text>
                        <Card.Text>Ph:{receiver.phone}</Card.Text>
                        <button
                          style={{ width: "fit-content" }}
                          onClick={event =>
                            setLocation(receiver.latitude, receiver.longitude)
                          }
                        >
                          Navigate to this Receiver
                        </button>
                      </Card>
                    </div>
                  );
                })}
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
