import React, { useState, useEffect } from "react";
import { isAuthenticated, getOrders } from "./index";
import Particles from "../../Home/ParticleContainer";
import classes from "./Reciever.module.css";
import RedMarker from "../../Assets/RedMarker.svg";
import BlueMarker from "../../Assets/BlueMarker.svg";
import { Card } from "react-bootstrap";
import { DisplayMapFC } from "./DisplayMapFC.jsx";

const Donor = () => {
  const [donorCurrentLatitude, setdonorCurrentLatitude] = useState(12);
  const [donorCurrentLongitude, setdonorCurrentLongitude] = useState(12);

  const [nearbyBloodBankLatitude, setNearbyBloodBankLatitude] = useState(null);
  const [nearbyBloodBankLongitude, setNearbyBloodBankLongitude] = useState(
    null
  );

  const [Order_data, setOrder_data] = useState([]);

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
    getOrders().then(data => {
      if (data.error) setError(data.error);
      else {
        let arr = [];
        for (let i in data) {
          arr.push(data[i]);
        }
        console.log(data);
        setOrder_data(arr);
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
            <div style={{ padding: "10px" }}>Order Location</div>
          </div>
        </div>
      </div>
    );
  };

  const setLocation = (lat, lon) => {
    console.log("called");
    setNearbyBloodBankLatitude(lat);
    console.log(nearbyBloodBankLatitude);
    console.log(lat + " lat lon " + lon);
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
              Welcome, {isAuthenticated().bloodbank.name}!
            </h2>
            <div className={classes.InfoContainer}>
              <div className={classes.arrayContainer}>
                <Card className={classes.card}>
                  <Card.Text>Active Orders</Card.Text>
                </Card>
                {Order_data.map((order, _id) => {
                  return (
                    <div>
                      <Card className={classes.card}>
                        <Card.Text>ID: {order._id}</Card.Text>
                        <Card.Text>
                          Blood Type: {order.blood}, Amount: {order.amount} L
                        </Card.Text>
                        <Card.Text>Contact: {order.receiver_phone}</Card.Text>
                        <Card.Text>
                          Deliver to: {order.receiver_address}
                        </Card.Text>
                        <Card.Text>
                          Contact Email: {order.receiver_email}
                        </Card.Text>
                        <button
                          style={{ width: "fit-content" }}
                          onClick={event =>
                            setLocation(
                              order.receiver_latitude,
                              order.receiver_longitude
                            )
                          }
                        >
                          Navigate to this Order
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
