import React, { Component } from "react";
import { signup } from "./index";
import classes from './DonorSignup.module.css'
import Particles from '../../Home/ParticleContainer';

//add email name pass validation

class DonorSignup extends Component {
	constructor() {
		super();
		this.state = {
			name: "",
			blood: "",
			phone: "",
			address: "",
			latitude: 12,
			longitude: 21,
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
		const {
			name,
			blood,
			phone,
			address,
			latitude,
			longitude,
			email,
			password
		} = this.state;

		const user = {
			name,
			blood,
			phone,
			address,
			latitude,
			longitude,
			email,
			password
		};

		signup(user).then(data => {
			if (data.error) this.setState({ error: data.error });
			else
				this.setState({
					name: "",
					blood: "",
					phone: "",
					address: "",
					email: "",
					password: "",
					error: "",
					open: true
				});
		});
	};

	signupForm = (name, blood, phone, address, email, password) => {
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
					<label className="text-muted">Blood Group</label>
					<select
						onChange={this.handleChange("blood")}
						className="form-control"
						value={blood}
					>
						<option value="Select">Select</option>
						<option value="A+">A+</option>
						<option value="A-">A-</option>
						<option value="B+">B+</option>
						<option value="B-">B-</option>
						<option value="O+">O+</option>
						<option value="O-">O-</option>
						<option value="AB+">AB+</option>
						<option value="AB-">AB-</option>
					</select>
				</div>
				<div className="form-group">
					<label className="text-muted">phone</label>
					<input
						onChange={this.handleChange("phone")}
						type="number"
						className="form-control"
						value={phone}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">address</label>
					<input
						onChange={this.handleChange("address")}
						type="text"
						className="form-control"
						value={address}
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
		const {
			name,
			blood,
			phone,
			address,
			email,
			password,
			error,
			open
		} = this.state;
		document.body.className = classes.bcg;
		return (
			<div className="container">
				<Particles />
				<h2 className="mt-5 mb-5">Donor Signup</h2>

				<div
					className="alert alert-primary"
					style={{ display: error ? "" : "none" }}
				>
					{error}
				</div>

				{this.signupForm(name, blood, phone, address, email, password)}

				<div
					className="alert alert-info"
					style={{ display: open ? "" : "none" }}
				>
					New Account is Created!!....Please Sign in
				</div>
			</div>
		);
	}
}

export default DonorSignup;
