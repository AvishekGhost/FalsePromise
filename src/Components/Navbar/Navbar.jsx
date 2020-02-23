import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../Auth";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const isActive = (history, path) => {
	if (history.location.pathname === path) return { color: "red" };
	else return { color: "#ffffff" };
};

const ExportedNavbar = ({ history }) => {
	return (
		<Navbar
			style={{ height: "3rem", background: "#343640" }}
			variant="dark"
			expand="lg"
			sticky="top"
		>
			<Navbar.Brand>
				<Link className="nav-link" style={isActive(history, "/")} to="/">
					Home
				</Link>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ml-auto">
					{!isAuthenticated() && (
						<>
							<li className="nav-item">
								<Link
									className="nav-link"
									style={isActive(history, "/signin")}
									to="/signin"
								>
									Sign in
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link"
									style={isActive(history, "/signup")}
									to="/signup"
								>
									Sign up
								</Link>
							</li>
						</>
					)}
					{isAuthenticated() && (
						<>
							<li className="nav-item">
								<a href="/#" className="nav-link">
									Welcome {isAuthenticated().user.name}!
								</a>
							</li>
							<li className="nav-item">
								<a
									href="/#"
									className="nav-link"
									style={
										(isActive(history, "/signout"),
										{ cursor: "pointer", color: "#fff" })
									}
									onClick={() => signout(() => history.push("/"))}
									to="/signout"
								>
									Sign out
								</a>
							</li>
						</>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default withRouter(ExportedNavbar);
