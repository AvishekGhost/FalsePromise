import React from "react";
import classes from "./Home.module.css";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import { DisplayMapFC } from "./DisplayMapFC";
import ParticleContainer from "./ParticleContainer";

const Home = () => {
	document.body.className = classes.bcg;
	return (
		<Layout className="main-layout">
			<ParticleContainer />
			<div className={classes.page}>
				<div className={classes.map}>
					<DisplayMapFC className={classes.op} />
					<ParticleContainer />
				</div>
				<div className={classes.pageContainer} style={{ width: "33vw" }}>
					<div className="jumbotron" style={{ opacity: 0.55 }}>
						<h1>Home</h1>
						<p className="lead">
							Blood Bank donation system can collect blood from many donators in
							short from various sources and distribute that blood to needy
							people who require blood. Online Blood Bank management system is
							to provide services for the people who are in need of blood by
							getting help from the donors who are interested in donating blood
							for the people.
						</p>
					</div>
					<Row>
						<Col>
							<Card style={{ opacity: 0.55 }}>
								<Card.Body>
									<Card.Title>Donate Blood</Card.Title>
									<Card.Text>Join us</Card.Text>
									<Link to="/signup">SIGN UP</Link>
								</Card.Body>
							</Card>
						</Col>
						<Col>
							<Card style={{ opacity: 0.55 }}>
								<Card.Body>
									<Card.Title>Need Blood?</Card.Title>
									<Card.Text>Already have an Account ?</Card.Text>
									<Link to="/signin">SIGN in</Link>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</div>
			</div>
			<ParticleContainer />
		</Layout>
	);
};
export default Home;
