import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../Auth";

const isActive = (history, path) => {
	if (history.location.pathname === path) return { color: "red" };
	else return { color: "#ffffff" };
};

const Navbar = ({ history }) => {
	return (
		<div>
			<ul className="navbar navbar-light bg-dark">
				<li className="nav-item">
					<Link className="nav-link" style={isActive(history, "/")} to="/">
						Home
					</Link>
				</li>
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
						<li className="nav-item">
							<a className="nav-link">Welcome {isAuthenticated().user.name}!</a>
						</li>
					</>
				)}
			</ul>
		</div>
	);
};

export default withRouter(Navbar);
