import React, { useState, useEffect } from "react";
import { isAuthenticated, getBloodBanks, getDonors } from "./index";
import Particles from "../../Home/ParticleContainer";
import classes from "./Reciever.module.css";
import RedMarker from "../../Assets/RedMarker.svg";
import BlueMarker from "../../Assets/BlueMarker.svg";
import { Card } from "react-bootstrap";
import { DisplayMapFC } from "./DisplayMapFC.jsx";
import OrderPage from "./OrderPage";

const Donor = () => {
  const [bbEmail, setbbEmail] = useState();
  const [bbPhone, setbbPhone] = useState();
  const [bbName, setbbName] = useState();
  const [bbAdd, setbbAdd] = useState();

  const [donorCurrentLatitude, setdonorCurrentLatitude] = useState(12);
  const [donorCurrentLongitude, setdonorCurrentLongitude] = useState(12);

  const [nearbyBloodBankLatitude, setNearbyBloodBankLatitude] = useState(null);
  const [nearbyBloodBankLongitude, setNearbyBloodBankLongitude] = useState(
    null
  );

  const [orderLoad, setOrderLoad] = useState(false);

  const [BloodBank_Data, setBloodBank_Data] = useState([]);
  const [Donor_Data, setDonor_Data] = useState([]);

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

    getDonors().then(data => {
      if (data.error) setError(data.error);
      else {
        let arr = [];
        for (let i in data) {
          arr.push(data[i]);
        }
        //console.log(arr);
        setDonor_Data(arr);
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

  const handlePlaceOrder = (em, ph, nm, ad) => {
    setbbEmail(em);
    setbbPhone(ph);
    setbbName(nm);
    setbbAdd(ad);
    setOrderLoad(true);
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
              Welcome, {isAuthenticated().receiver.name}!
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
                        <button
                          style={{ width: "fit-content" }}
                          onClick={event =>
                            handlePlaceOrder(
                              bloodbank.email,
                              bloodbank.phone,
                              bloodbank.name,
                              bloodbank.address
                            )
                          }
                        >
                          Place Order
                        </button>
                      </Card>
                    </div>
                  );
                })}
              </div>
              <div className={classes.arrayContainer}>
                <Card className={classes.card}>
                  <Card.Text>Nearest Donors</Card.Text>
                </Card>
                {Donor_Data.map((donor, _id) => {
                  return (
                    <div>
                      <Card className={classes.card}>
                        <Card.Text>Name: {donor.name}</Card.Text>
                        <Card.Text>Address: {donor.address}</Card.Text>
                        <Card.Text>Ph:{donor.phone}</Card.Text>
                        <button
                          style={{ width: "fit-content" }}
                          onClick={event =>
                            setLocation(donor.latitude, donor.longitude)
                          }
                        >
                          Navigate to this Donor
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
      <div>
        {orderLoad && (
          <OrderPage
            bbEmail={bbEmail}
            bbPhone={bbPhone}
            bbAddress={bbAdd}
            orderLoad={orderLoad}
            set={setOrderLoad}
            bbName={bbName}
          />
        )}
      </div>
    </>
  );
};

export default Donor;
