import React, { Component } from "react";
import { signup } from "./index";
import Particles from 'react-particles-js';
//add email name pass validation

class Signup extends Component {
	constructor() {
		super();
		this.state = {
			name: "",
			email: "",
			password: "",
			error: "",
			open: false
		};
	}

	handleChange = name => event => {
		this.setState({ error: "" });
		this.setState({ [name]: event.target.value });
	};

	clickSubmit = event => {
		event.preventDefault();
		const { name, email, password } = this.state;
		const user = {
			name,
			email,
			password
		};
		signup(user).then(data => {
			if (data.error) this.setState({ error: data.error });
			else
				this.setState({
					name: "",
					email: "",
					password: "",
					error: "",
					open: true
				});
		});
	};

	signupForm = (name, email, password) => {
		return (
			<form>
				<div className="form-group">
					<label className="text-muted">Name</label>
					<input
						onChange={this.handleChange("name")}
						type="text"
						className="form-control"
						value={name}
					/>
				</div>
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
					Sign up
				</button>
			</form>
		);
	};

	render() {
		const { name, email, password, error, open } = this.state;

		return (
			<div className="container">
				<h2 className="mt-5 mb-5">Signup</h2>

				<div
					className="alert alert-primary"
					style={{ display: error ? "" : "none" }}
				>
					{error}
				</div>

				{this.signupForm(name, email, password)}

				<div
					className="alert alert-info"
					style={{ display: open ? "" : "none" }}
				>
					New Account is Created!!....Please Sign in
				</div>
				<Particles
        params={{
	        "particles": {
	        "number": {
	            "value": 160,
	            "density": {
	                "enable": false
	            }
	        },
	        "size": {
	            "value": 3,
	            "random": true,
	            "anim": {
	                "speed": 4,
	                "size_min": 0.3
	            }
	        },
	        "line_linked": {
	            "enable": false
	        },
	        "move": {
	            "random": true,
	            "speed": 1,
	            "direction": "top",
	            "out_mode": "out"
	        }
	    },
	    "interactivity": {
	        "events": {
	            "onhover": {
	                "enable": true,
	                "mode": "bubble"
	            },
	            "onclick": {
	                "enable": true,
	                "mode": "repulse"
	            }
	        },
	        "modes": {
	            "bubble": {
	                "distance": 250,
	                "duration": 2,
	                "size": 0,
	                "opacity": 0
	            },
	            "repulse": {
	                "distance": 400,
	                "duration": 4
	            }
	        }
	    }
	}} />
			</div>
		);
	}
}

export default Signup;
