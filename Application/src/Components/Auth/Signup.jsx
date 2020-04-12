import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Particles from '../Home/ParticleContainer';
import classes from './Signin.module.css';
const Signup = () => {
	document.body.className = classes.bcg;
	return (
		<>
			<div style={{ margin: "5vw" }}>
				<Particles />
				<div className="jumbotron" style={{ opacity: 0.55 }}>
					<h1>Sign Up page</h1>
				</div>
				<Row>
					<Col>
						<Card style={{ opacity: 0.55 }}>
							<Card.Body>
								<Card.Title>Donate Blood</Card.Title>
								<Card.Text>Click here to donate blood.</Card.Text>
								<Link to="/donor/signup">Donor Sign up</Link>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card style={{ opacity: 0.55 }}>
							<Card.Body>
								<Card.Title>Need Blood?</Card.Title>
								<Card.Text>Click here to accept blood.</Card.Text>
								<Link to="/reciever/signup">Reciever Sign up</Link>
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
								<Link to="/bloodbank/signup">Blood bank Sign up</Link>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card style={{ opacity: 0.55 }}>
							<Card.Body>
								<Card.Title>Delivery Agent</Card.Title>
								<Card.Text>Click here for blood delivery.</Card.Text>
								<Link to="/driver/signup">Driver Sign up</Link>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</div>
		</>
	);
};

export default Signup;
