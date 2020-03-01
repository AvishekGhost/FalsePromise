import React, { useState, useEffect } from "react";
import { placeorder } from "./index";
import { isAuthenticated } from "./index";
import { Card } from "react-bootstrap";
//add email name pass validation

const OrderPage = ({ set, bbEmail, bbPhone, bbName, bbAddress, orderLoad }) => {
  const [bloodbankEmail, setbloodbankEmail] = useState(null);
  const [bloodBankPhone, setBloodBankPhone] = useState(null);
  const amount = 100;
  const pass = "1234";

  const clickSubmit = event => {
    event.preventDefault();
    let blood = isAuthenticated().receiver.blood;
    let ph = isAuthenticated().receiver.phone;
    let add = isAuthenticated().receiver.address;
    let lat = isAuthenticated().receiver.latitude;
    let lon = isAuthenticated().receiver.longitude;
    let em = isAuthenticated().receiver.email;

    const user = {
      bloodbank_email: bloodbankEmail,
      bloodbank_phone: bloodBankPhone,
      blood: blood,
      amount: amount,
      receiver_phone: ph,
      receiver_address: add,
      receiver_latitude: lat,
      receiver_longitude: lon,
      receiver_email: em,
      password: pass
    };

    placeorder(user).then(data => {
      if (data.error) console.log(data.error);
    });
    set(false);
  };

  useEffect(() => {
    setBloodBankPhone(bbPhone);
    setbloodbankEmail(bbEmail);
  }, [bbEmail, bbPhone]);

  const clickCancel = event => {
    event.preventDefault();
    set(false);
  };
  return (
    <div className="container">
      <div style={{ backgroundColor: "white" }}>
        <Card
          style={{
            margin: "50px",
            padding: "10px",
            borderRadius: "10px"
          }}
        >
          <Card.Text>Confirm Your Details</Card.Text>
          <Card.Text>
            Odered Blood type: {isAuthenticated().receiver.blood}
          </Card.Text>
          <Card.Text>
            Your hhone Number: {isAuthenticated().receiver.phone}
          </Card.Text>
          <Card.Text>
            Delivery Address: {isAuthenticated().receiver.address}
          </Card.Text>
          <Card.Text>
            Your email id: {isAuthenticated().receiver.email}
          </Card.Text>
          <Card.Text>Ordering from:</Card.Text>
          <Card.Text>Blood Bank: {bbName}</Card.Text>
          <Card.Text>Blood Bank Email: {bbEmail}</Card.Text>
          <Card.Text>Blood Bank Phone: {bbPhone}</Card.Text>
          <Card.Text>Blood Bank Address: {bbAddress}</Card.Text>

          <Card.Text>Total: {amount}</Card.Text>
          <button sytle={{ width: "fit-content" }} onClick={clickSubmit}>
            place order
          </button>
          <button sytle={{ width: "fit-content" }} onClick={clickCancel}>
            cancel
          </button>
        </Card>
      </div>
    </div>
  );
};

export default OrderPage;
