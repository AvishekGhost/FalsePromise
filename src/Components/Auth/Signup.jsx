import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./Home.module.css";

const Signup = () => {
  return (
    <>
      <div className={classes.pageContainer} style={{ width: "33vw" }}>
        <div className="jumbotron" style={{ opacity: 0.55 }}></div>
        <Row>
          <Col>
            <Card style={{ opacity: 0.55 }}>
              <Card.Body>
                <Card.Title>Donate Blood</Card.Title>
                <Card.Text>Click here to donate blood.</Card.Text>
                <Link to="/donor">SIGN UP</Link>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ opacity: 0.55 }}>
              <Card.Body>
                <Card.Title>Need Blood?</Card.Title>
                <Card.Text>Click here to accept blood.</Card.Text>
                <Link to="/donor">SIGN UP</Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Card style={{ opacity: 0.55 }}>
              <Card.Body>
                <Card.Title>Blood Bank</Card.Title>
                <Card.Text>Click here to register your Blood Bank.</Card.Text>
                <Link to="/signup">SIGN UP</Link>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ opacity: 0.55 }}>
              <Card.Body>
                <Card.Title>Delivery Agent</Card.Title>
                <Card.Text>Click here for blood delivery.</Card.Text>
                <Link to="/signup">SIGN UP</Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Signup;
