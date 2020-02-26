import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { signin, authenticate } from "./index";
import Particles from "react-particles-js";

class DonorSignin extends Component {
	constructor() {
		super();

		this.state = {
			email: "",
			password: "",
			error: "",
			redirectToReferer: false,
			loading: false
		};
	}

	particleParams = () => {
		return {
			particles: {
				number: {
					value: 160,
					density: {
						enable: false
					}
				},
				size: {
					value: 3,
					random: true,
					anim: {
						speed: 4,
						size_min: 0.3
					}
				},
				line_linked: {
					enable: false
				},
				move: {
					random: true,
					speed: 1,
					direction: "top",
					out_mode: "out"
				}
			},
			interactivity: {
				events: {
					onhover: {
						enable: true,
						mode: "bubble"
					},
					onclick: {
						enable: true,
						mode: "repulse"
					}
				},
				modes: {
					bubble: {
						distance: 250,
						duration: 2,
						size: 0,
						opacity: 0
					},
					repulse: {
						distance: 400,
						duration: 4
					}
				}
			}
		};
	};

	handleChange = name => event => {
		this.setState({ error: "" });
		this.setState({ [name]: event.target.value });
	};

	clickSubmit = event => {
		event.preventDefault();
		this.setState({ loading: true });
		const { email, password } = this.state;
		const user = {
			email,
			password
		};
		console.log(user);
		signin(user).then(data => {
			if (data.error) this.setState({ error: data.error, loading: false });
			else {
				authenticate(data, () => {
					this.setState({ redirectToReferer: true });
				});
			}
		});
	};

	signinForm = (email, password) => {
		return (
			<form>
				<div className="form-group">
					<label className="text-muted">Email</label>
					<input
						onChange={this.handleChange("email")}
						type="email"
						className="form-control"
						value={email}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Password</label>
					<input
						onChange={this.handleChange("password")}
						type="password"
						className="form-control"
						value={password}
					/>
				</div>
				<button
					onClick={this.clickSubmit}
					className="btn btn-raised btn-primary"
				>
					Sign in
				</button>
			</form>
		);
	};

	render() {
		const { email, password, error, redirectToReferer, loading } = this.state;

		if (redirectToReferer) {
			return <Redirect to="/donor" />;
		}

		return (
			<div className="container">
				<h2 className="mt-5 mb-5">Sign in</h2>

				<div
					className="alert alert-primary"
					style={{ display: error ? "" : "none" }}
				>
					{error}
				</div>

				{loading ? (
					<div className="jumbotron text-center">
						<h2>Loading...</h2>
					</div>
				) : (
					""
				)}
				{this.signinForm(email, password)}
				<Particles params={this.particleParams()} />
			</div>
		);
	}
}
export default DonorSignin;
